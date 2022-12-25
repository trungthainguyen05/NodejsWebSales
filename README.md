
## Tổng quan về nodejs: đây là flatform hay hệ điều hành để ứng dụng chạy
## express là thư viện phổ biến nhất. framework express
## ORM: object - relational - mapping (sự kết nối của các object tham chiếu tới database). Xem các bảng như là 1 object. db -> User.find(Where: id=7)
## Bất đồng bộ và Promise.

# Khởi tạo ứng dụng nodejs
npm init

npm outdated : check xem thư viện có bị lỗi thời?

npm install --save-exact ......@version
example: npm install --save-exact @babel/core@7.19.3

# Body-parser: Là phần mềm phân tích phần body của Node.js
# Dotenv: Dotenv là một mô đun zero-dependency, tải các biến môi trường từ tệp .env vào process.env
# Axios: Là client HTTP dựa trên promise cho trình duyệt và node.js
# Cors: CORS là gói node.js để cung cấp phần mềm trung gian Connect / Express có thể được sử dụng để bật CORS với nhiều tùy chọn khác nhau
# ejs: là view engine. Help you to render HTML
# nodemon: is a tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected
# @babel/core
# @babel/node
# @babel/preset-env


npm install --save-exact body-parser@1.20.1 dotenv@16.0.3 express@4.18.2 ejs@3.1.8
npm install --save-dev @babel/core@7.20.2 @babel/node@7.20.2 @babel/preset-env@7.20.2 nodemon@2.0.20

# Running webSales
npm start

### Install DATABASE
# Sequelize là một ORM Node.js nền Promise dành cho Postgres, MySQL, MariaDB, SQLite và Microsoft SQL Server.
npm install --save-dev sequelize@6.28.0

# sequelize-cli is command Line Interface (for write code)
npm install --save-dev sequelize-cli@6.5.2

npx sequelize --help
npx sequelize init

npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
npx sequelize-cli db:migrate
npx sequelize-cli db:migrate:undo

# mysql2 : cấu hình truy cập đến database, có thể sử dụng lệnh query đến sever để lấy dữ liệu
npm install --save mysql2@2.2.5

