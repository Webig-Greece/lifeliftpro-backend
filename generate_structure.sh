#!/bin/bash

# Generate complete file structure for src/
find src/ -type f > project_structure.txt

echo "Complete file structure generated and saved to nestjs_complete_structure.txt."
read -rsp $'Press any key to continue...\n'
