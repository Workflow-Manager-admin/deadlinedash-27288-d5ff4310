#!/bin/bash
cd /home/kavia/workspace/code-generation/deadlinedash-27288-d5ff4310/deadline_dash
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

