#!/bin/bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
git push --all nas
git push --all git
git push --all tangled
git push --all github