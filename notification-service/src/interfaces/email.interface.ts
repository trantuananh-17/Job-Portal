export interface IEmailLocals {
  appLink: string; // Link chính trang web
  appIcon: string; // Logo hiển thị trong email

  sender?: string; // Tên người gửi
  receiverEmail?: string; // Email người nhận
  username?: string; // Tên người nhận

  subject?: string; // Tiêu đề email
  header?: string; // Dòng header chính (vd: "Chúc mừng, tin đăng của bạn đã được duyệt!")
  message?: string; // Nội dung ngắn gọn

  type?: string;

  actionText?: string; // Text cho nút CTA (vd: "Xem chi tiết", "Xác nhận ngay")
  actionLink?: string; // Link gắn với nút CTA

  jobId?: string; // ID công việc
  jobTitle?: string; // Tên công việc
  companyId?: string; // ID công ty
  companyName?: string; // Tên công ty
  orderId?: string; // Mã đơn hàng (nếu có hệ thống thanh toán)
  planName?: string; // Tên gói dịch vụ / order plan

  verifyLink?: string; // Link xác minh tài khoản
  resetLink?: string; // Link đặt lại mật khẩu

  createdAt?: string; // Ngày gửi / ngày tạo
}
