# chatified

CLI Tool to generate a long-form printout of an entire projects source code as well as a representation of your project structure, intended for use with ChatGPT.

Easily copy and paste the generated `chatified.txt` file into ChatGPT to provide the AI with all the context it needs to help you with your project.

## Installation

In your terminal:

`npm i -g chatified`

In the root directory of your project:

`chatified`

## Notes and Limitations

Currently, this script only checks for a `.gitignore` file in your root directory to determine which files to omit from the generated file. This can lead to unintended or overly verbose `chatified.txt` files. For example a large config file may be unnecessary to include in the generated file, but is crucial to your project and thus not ignored by git and ultimately included in `chatified.txt`. I plan to add optional command line flags to fix this, and an additional config file specific to `chatified` where you can determine the exact files you want and don't want.

If you have any ideas or suggestions, feel free to open a discussion or PR on the repo. Thanks!