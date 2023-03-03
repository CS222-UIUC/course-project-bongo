# course-project-bongo

# How to run:
1. switch to your branch and fetch+merge \
`git checkout [your_branch]` \
`git fetch origin` \
`git merge origin/main`


2. node install \
`cd nextjs` \
`npm i` 

3. run \
`cd nextjs` \
`npx next dev` \
Note: please ignore the following error, as we currently do not know how to resolve it, and it doesn't interfere with any functionality:
`[webpack.cache.PackFileCacheStrategy] Caching failed for pack: Error: Unable to snapshot resolve dependencies` 


4. how to push (create pr review) \
`git add .` \
`git commit -m"your commit message"` \
`git push` // push to your own remote branch \
`git push origin [your_branch]:main` // push from your branch to main \
then open github and open pr review to merge to main 
