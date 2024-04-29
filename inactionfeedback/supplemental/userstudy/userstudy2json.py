import sys
import os
import re
import glob


def main(participants_dir):
    json_out = {}

    for p in os.listdir(participants_dir):
        if p[0] == '.': # ignore .DS_Store
            continue

        json_out[p] = {}
        designs_dir = os.path.join(participants_dir, p)
        # print p

        leftfile = glob.glob(designs_dir + '/*_left.txt')
        rightfile = glob.glob(designs_dir + '/*_right.txt')

        with open(leftfile[0], 'r') as file:
            leftfile = file.read()
        with open(rightfile[0], 'r') as file:
            rightfile = file.read()

        # print (leftfile)
        # print (rightfile)

        json_out[p]['skeleton'] = os.path.join(designs_dir, 'initial.png')
        json_out[p]['final'] = os.path.join(designs_dir, 'final.png')
        json_out[p]['skeleton-issues'] = leftfile
        json_out[p]['final-issues'] = rightfile

    return json_out
                   
# python userstudy2json.py
if __name__ == "__main__":
    feedback_dir = os.path.join('feedback')
    baseline_dir = os.path.join('baseline')

    data = {}

    data['feedback'] = main(feedback_dir)
    data['baseline'] = main(baseline_dir)

    print data