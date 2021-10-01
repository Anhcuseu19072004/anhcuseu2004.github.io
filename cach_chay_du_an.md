# anhcuseu2004.github.io
cách chạy dự án 
B1 : tải xampp
      - sau khi tải xong bật nó lên
      - khởi chạy (start) apache và mySQL
      - truy cập phpmyadmin của xampp (thường là "localhost/phpmyadmin" hoặc "127.0.0.1/phpmyadmin")
      - sau đó tạo một database tên mydb 
      - lưu ý đối với tên tài khoản admin của mySQL phải để là
        user name : root
        pass word : "" tức là không có mật khẩu
      
B2 : vào thư mục chứa dự án "web_django3_env/Scripts/" mở cmd tại thư mục này rồi chạy lệnh activate.bat
  * Lưu ý là không được tắt cửa sổ cmd sau khi chạy file activate.bat và dùng của sổ đó để di chuyển đến thư mục như Hướng dẫn ở B3
B3 : di chuyển đến thư mục "forum_student" bên trong có file "manage.py" 
B4 : sau khi di chuyển đến thư mục forum_student (bên trong thư mục forum_studient luôn). chạy lệnh python manage.py migrate rồi chạy tiếp lệnh python manage.py runserver
- lúc này server dã được chạy web đã lên truy cập vào web theo HOST server trả về
