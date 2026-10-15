# HimiDex Game Website

Website tĩnh giới thiệu studio game mobile, tối ưu cho desktop và điện thoại, kèm trang Chính sách quyền riêng tư phục vụ liên kết trên Google Play.

Website hỗ trợ English (mặc định), Tiếng Việt và 日本語. Lựa chọn ngôn ngữ được lưu trên trình duyệt khi người dùng chuyển trang.

## Xem website

Mở `index.html` trực tiếp hoặc chạy một static server tại thư mục dự án.

- Trang chủ: `index.html`
- Chính sách quyền riêng tư: `privacy.html`
- Giao diện và responsive: `assets/styles.css`
- Tương tác và animation: `assets/app.js`
- Nội dung đa ngôn ngữ: `assets/i18n.js`

## Cần cập nhật trước khi phát hành

1. Thay link Google Play trong `index.html` bằng URL developer page hoặc ứng dụng thật.
2. Đối chiếu mục dữ liệu, SDK quảng cáo/analytics và đối tượng trẻ em trong `privacy.html` với hành vi thật của ứng dụng.
3. Đảm bảo nội dung trùng khớp với biểu mẫu **Data safety** trên Google Play Console.
4. Cập nhật ngày hiệu lực mỗi khi thay đổi chính sách.

> Nội dung chính sách là mẫu triển khai kỹ thuật, không phải tư vấn pháp lý và không thể tự đảm bảo phê duyệt nếu khai báo không khớp với ứng dụng thực tế.
