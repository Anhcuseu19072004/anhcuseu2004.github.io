=======================
=== Cách chạy dự án ===

* những yêu cầu cần thiết:
- đã cài trình biên dịch cho Python
- win 7 trở lên (không hỗ trợ Linux, ubuntu, macOS..)
- CPU xung nhịp từ 2.0 Ghz trở lên (server rất nặng)
- RAM từ 2Gb trở lên

* Hướng dẫn setup
1. setup Database (quan trọng)

- tải xampp, khởi chạy app xampp
- ở dòng MySql nhấn ConFig chọn tiếp my.ini
- tìm dòng "port = ...." sửa thành "port = 3306"
- tiếp theo tìm dòng "max_allowed_packet = 1M" và sửathành "max_allowed_packet = 10M"
- ở dòng "bind-address = 'localhost' " sửa thành "bind-address =  '127.0.0.1' "
- sau khi đã setup xong tại XAMPP Control Panel dòng MySql nhấn start, và dòng apache nhấn start
- truy cập localhost/phpmyadmin
- tại giao diện quản trị của xampp tạo một database tên "mydb" tên này là bắt buộc không dùng tên khác 

2. Khởi chạy môi trường ảo (bắt buộc)

- vào thư mục vừa clone dự án về vào Folder tên "Script" mở cmd tại đây
- sau khi mở cmd xẽ có đường dẫn như:  ...web_django3_env\Scripts>
- tại đây chạy lệnh "activate.bat"
- sau khi chạy đường dẫn sẽ đổi thành: (web_django3_env) C:\IT\KHKT\web_django3_env\Scripts> là thành công

3. Khởi chạy server 

- sau khi đã khởi chạy môi trường ảo không tắt cmd và dùng cmd đã chạy môi trường ảo di chuyển đến thư mục:
  (web_django3_env) C:\IT\KHKT\web_django3_env\forum_student> tùy vào máy mà đường dẫn đến web_django3_env có thể khác nhau
- sau khi truy cập đến đường dẫn này tại đây thực hiện từng lệnh sau:

- python manage.py makemigtation
- python manage.py migrate
- python manage.py runserer
- sau khi chạy xong lệnh trên server sẽ trả về chuỗi:

Watching for file changes with StatReloader
Performing system checks...

System check identified no issues (0 silenced).
October 10, 2021 - 12:32:52
Django version 3.2.7, using settings 'forum_student.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CTRL-BREAK.

Là đã thành công, truy cập vào địa chỉ do server trả về ở đây là: " http://127.0.0.1:8000/ "

nếu không khởi chạy được server vui lòng xem thêm hướng dẫn bên dưới

4. các lỗi thường gặp

- báo thiếu bất kỳ module nào:
  lỗi này xảy ra khi chưa chạy môi trường ảo vậy nên hãy xem hướng dẫn chạy môi trường ảo tại " 2 "
  nếu thiếu module tinymce chạy lệnh: pip install django-tinymce

- báo lỗi: " django.db.utils.OperationalError: (2002, "Can't connect to MySQL server on '127.0.0.1' (10061)") "
  lỗi này xảy ra khi server MySql chưa chạy hoặc thiết lập địa chỉ của server MySql sai, xem lại " 1 "


========== Câu Lạc Bộ Tin Học Trường THPT Lương Sơn =============

