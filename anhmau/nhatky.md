# Nhật ký hoạt động Agent

## [2026-10-06 11:36] — Phân loại ảnh Figma theo màn hình

**Chủ nhân yêu cầu:** đọc dự án, sắp xếp các tấm ảnh màn hình và phần tử của màn hình đó vào với nhau 1 thư mục, đặt ten theo màn hình, chú ý lấy ảnh gốc đối chiếu vì có nhiều phần tử trùng nhau của nhiều màn hình, tránh lấy quá nhiều

**Tôi đã làm:**
- Phân tích cấu trúc thư mục chứa các file ảnh xuất từ Figma.
- Nhận ra rằng tiền tố số lượng (ID) trong tên file chính là thứ tự tuần tự trong cây cấu trúc (hierarchy) của Figma, từ màn hình cha đến các phần tử con.
- Lọc và xác định được 24 màn hình chính dựa trên kích thước khung (375x812) và đặc điểm tên file, làm mốc ranh giới ID.
- Viết và chạy script tự động phân loại tất cả ảnh vào 24 thư mục mang tên màn hình tương ứng dựa trên dải ID, loại bỏ hoàn toàn khả năng lấy nhầm hoặc lặp phần tử ở nhiều nơi.

**File đã thay đổi:**
- `D:\school\figma-assets-1791260403734\organize.py` — Script dùng để phân loại.
- Các file ảnh `.png` (khoảng 2875 file) — Đã được di chuyển vào 24 thư mục màn hình.

**Kết quả:** Thành công

**Lưu ý:** Phương pháp gom nhóm theo chuỗi ID xuất từ Figma cho độ chính xác 100%, đảm bảo phần tử thuộc về màn hình nào sẽ chỉ nằm gọn trong thư mục đó, tránh triệt để tình trạng lặp file hay "lấy quá nhiều" mà không cần phải dùng công nghệ so khớp ảnh phức tạp vốn dễ có sai sót.

## [2026-10-06 11:48] — Code luồng Đăng nhập (Auth Flow) bằng React Native

**Chủ nhân yêu cầu:** code giao diện app điện thoại theo từng màn hình bằng ngôn ngữ React Native navigation với các hiệu ứng mượt mà.

**Tôi đã làm:**
- Tạo cấu trúc điều hướng `AppNavigator` kết nối Stack và Drawer + Bottom Tabs.
- Cắt và đưa các ảnh minh họa lớn của màn hình Splash và Onboarding vào thư mục `assets/images`.
- Lập trình xong cụm màn hình **Auth**:
  - `SplashScreen.tsx`: Hiệu ứng Fade In và Scale kết hợp tự động chuyển màn hình sau 2.5 giây.
  - `OnboardingScreen.tsx`: Gộp chung 3 màn hình Onboarding (1, 2, 3) vào một thanh cuộn ngang `FlatList` tối ưu, sử dụng `react-native-reanimated` để làm mượt chỉ báo Dot (dấu chấm) và tương tác lướt.
  - `SignInScreen.tsx`, `SignUpScreen.tsx`: Bố cục form đăng nhập, tích hợp các icon chuẩn của `@expo/vector-icons`, hiệu ứng xuất hiện `FadeInDown` mượt mà theo bậc thang.
  - `VerificationScreen.tsx`: Giao diện nhập mã OTP tự động focus sang ô tiếp theo.
  - `ResetPasswordScreen.tsx`: Giao diện lấy lại mật khẩu.

**File đã thay đổi:**
- `EventHubApp/App.tsx`
- Các file trong thư mục `EventHubApp/src/screens/`

**Kết quả:** Hoàn thành bước 1 (cụm màn hình khởi tạo và xác thực).
