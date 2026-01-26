
# 1. Base image
FROM node:22

# 2. Create app directory
WORKDIR /app

# 3. Copy package.json and package-lock.json (if availabel)
COPY package*.json ./

# 4. Install app dependencies
RUN npm install

# 5. Copy project files (copy rest of oour app into container)
COPY . .

# 6. Set port 
ENV PORT=5002

# 7. Expose the port so our computer can access it
EXPOSE 5002

# 8. Run the app
CMD ["npm", "start"]