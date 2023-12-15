import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { ROUTES } from "routes/RouterConfig";
import { twMerge } from "tailwind-merge";

const ExpandTransitionTime = 300;

const commonTransition = {
  type: "spring",
  stiffness: 200,
  damping: 20,
};

const navItems = [
  {
    title: "Khi CẦN mình có NHAU",
    icon: null,
    items: [
      {
        path: ROUTES.Home,
        title: "Chiến dịch thương hiệu: Khi CẦN mình có NHAU",
      },
    ],
  },
  {
    title: "Blog",
    icon: null,
    items: [
      { path: ROUTES.BlogBaiVietNoiBat, title: "Bài viết nổi bật" },
      { path: ROUTES.BlogKientThucBaoHiem, title: "Kiến thức bảo hiểm" },
      { path: ROUTES.BlogSucKhoeTheChat, title: "Sức khỏe thể chất" },
      { path: ROUTES.BlogChamSocTinhThan, title: "Chăm sóc tinh thần" },
      { path: ROUTES.BlogQuanLyTaiChinh, title: "Quản lý tài chính" },
    ],
  },
  {
    title: "Sản phẩm bảo hiểm",
    icon: null,
    items: [
      { path: ROUTES.BaoHiemTaiNan, title: "Bảo hiểm tai nạn" },
      { path: ROUTES.BaoHiemBenhHiemNgheo, title: "Bảo hiểm bệnh hiểm nghèo" },
      {
        path: ROUTES.BaoHiemChamSocSucKhoe,
        title: "Bảo hiểm chăm sóc sức khỏe",
      },
      {
        path: ROUTES.BaoHiemTuVongVaThuongTat,
        title: "Bảo hiểm từ vong và thương tật",
      },
      { path: ROUTES.BaoHiemTonThuong, title: "Bảo hiểm tổn thương" },

      { path: ROUTES.DauTuAnToan, title: "Đầu tư an toàn" },
      {
        path: ROUTES.DauTuLinhHoat,
        title: "Đầu tư linh hoạt với lợi nhuận/rủi ro không đảm bảo",
      },
      { path: ROUTES.DauTuDaiHan, title: "Đầu tư dài hạn" },

      { path: ROUTES.TichLuyGiaoDudc, title: "Tích lũy Giáo dục" },
      { path: ROUTES.TichLuyTuongLai, title: "Tích lũy Tương lai" },
    ],
  },
  {
    title: "Chăm sóc khách hàng",
    icon: null,
    items: [
      {
        path: ROUTES.CSKHGiaiQuyetQuyenLoiBaoHiem,
        title: "Giải quyết quyền lợi bảo hiểm",
      },
      {
        path: ROUTES.CSKHKenhThanhToanPhiBaoHiem,
        title: "Kênh thanh toán phí bảo hiểm",
      },
      {
        path: ROUTES.CSKHPROOnlineCongThongTin,
        title: "PRUOnline - Cổng thông tin khách hàng",
      },
      {
        path: ROUTES.CSKHPRORewardDoiDiemNhanQua,
        title: "PRURewards - Đổi điểm nhận quà",
      },
      {
        path: ROUTES.CSKHThongTinUuDaiVaDichVu,
        title: "Thông tin & ưu đãi dịch vụ",
      },
      {
        path: ROUTES.CSKHTaiLieuVaBieuMauThamKhao,
        title: "Tài liệu và biểu mẫu tham khảo",
      },
      {
        path: ROUTES.CSKHChuongTrinhKhuyenMai,
        title: "Chương trình khuyến mại nổi bật",
      },
      {
        path: ROUTES.CSKHThucHienQuyenCuaChuThe,
        title: "Thực hiện quyền của chủ thể dữ liệu",
      },
    ],
  },
  {
    title: "Cơ hội nghề nghiệp",
    icon: null,
    items: [
      {
        path: ROUTES.CHNNTaiProtector,
        title: "Cơ hội nghề nghiệp tại Protector",
      },
      {
        path: ROUTES.CHNNPhatTrien,
        title: "Cơ hội phát triển tại kênh hợp tác kinh doanh",
      },
      {
        path: ROUTES.CHNNChuyenVienHoachDinhProplanner,
        title: "ProPlanner - Chuyên viên hoạch định tài chính",
      },
      {
        path: ROUTES.CHNNTaiProtector,
        title:
          "PRURewards - Chuyên viên hoạch định tài chính Protector - Kênh đại lý",
      },
    ],
  },
  {
    title: "Về Protector",
    icon: null,
    items: [
      { path: ROUTES.AboutProtector, title: "Tìm hiểu về Protector" },
      {
        path: ROUTES.AboutPhatTrienCongDong,
        title: "Phát triển cộng đồng bền vững",
      },
      {
        path: ROUTES.AboutTuDoTuoi50,
        title: "Tự do tuổi 50 - Sẵn sàng cho cuộc sống về già",
      },
      {
        path: ROUTES.AboutChienDichThuongHieu,
        title: "Chiến dịch thương hiệu: Khi Tình Yêu Đủ Lớn",
      },
      { path: ROUTES.About175NamTonVinh, title: "175 năm tôn vinh cuộc sống" },
      { path: ROUTES.AboutThongCaoBaoChi, title: "Thông cáo báo chí" },
      {
        path: ROUTES.AboutVanPhongGiaoDichGanBanNhat,
        title: "Văn phòng giao dịch gần bạn nhất",
      },
      { path: ROUTES.AboutLienHe, title: "Liên hệ" },
    ],
  },
];

const underLineActiveClassName =
  "w-full h-[5px] translate-y-[1px] rounded-lg bg-white absolute bottom-0 left-0 opacity-0 group-hover:opacity-100 duration-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform";

const NavItem = (props) => {
  const { title, icon, isActive = false, handleNavClick } = props;

  return (
    <button onClick={handleNavClick}>
      <div
        className={twMerge(
          "group flex relative h-full justify-start gap-4 px-[10px] py-[20px] items-center cursor-pointer text-[18px] font-semibold",
        )}
      >
        {icon && (
          <FontAwesomeIcon icon={icon} className="h-5 w-5 leading-[0px]" />
        )}
        <div className="">{title}</div>
        <div className={underLineActiveClassName}></div>
        {isActive && (
          <div className="w-full h-[5px] translate-y-[1px] rounded-lg bg-white absolute bottom-0 left-0 " />
        )}
      </div>
    </button>
  );
};

const SideBar = ({ isScrollAtTop, setIsScrollAtTop }) => {
  const [activeItem, setActiveItem] = useState(null);
  const [isNavExpand, setIsNavExpand] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      console.log(window.scrollY);
      if (window.scrollY > 0) {
        setIsScrollAtTop(false);
      } else {
        setIsScrollAtTop(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [controls]);

  const handleNavClick = (item) => {
    setIsNavExpand(!isNavExpand);
    if (activeItem !== item) {
      setTimeout(() => {
        setActiveItem(item);
        setIsNavExpand(true);
      }, ExpandTransitionTime);
    }
    setActiveItem(item);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 5;

      if (window.scrollY > scrollThreshold) {
        setIsNavExpand(false);

        // clean up
        setActiveItem(null);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const CheckIsActive = (item) => {
    return item === activeItem;
  };

  return (
    <div
      className={twMerge(
        "min-w-[1166px] w-[1166px] transition-all duration-300 ease-in-out",
        isScrollAtTop ? "" : "!w-screen",
      )}
    >
      <motion.div transition={commonTransition} animate={controls}>
        <nav
          className={twMerge(
            "justify-center px-[33px] gap-4 rounded-lg relative min-h-[69px] shadow-sm flex-row flex transition-all duration-300 ease-in-out",
            isScrollAtTop
              ? "bg-primary text-white"
              : "bg-white text-black-primary",
          )}
        >
          {navItems.map((item, index) => {
            const isActive = CheckIsActive(item);
            return (
              <NavItem
                key={index}
                isActive={isActive}
                paths={item.paths}
                items={item.items}
                title={item.title}
                icon={item.icon}
                handleNavClick={() => handleNavClick(item)}
              />
            );
          })}
        </nav>
        <AnimatePresence>
          {isNavExpand && activeItem && (
            <motion.div
              className="w-full max-w-[1166px] m-auto px-2 mt-[-6px] bg-white pt-[46px] pb-[40px] shadow-sm origin-top grid lg:grid-cols-4 gap-y-8"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              exit={{ scaleY: 0 }}
              transition={{
                duration: ExpandTransitionTime / 1000,
                ease: "easeInOut",
              }}
            >
              {activeItem.items.map((item, idx) => {
                return (
                  <Link key={idx} to={item.path}>
                    <div className="w-[300px] px-4 flex flex-row items-end flex-1 relative">
                      <div className="text-[22px] relative">
                        {item.title}
                        <span className="ml-3">
                          <FontAwesomeIcon
                            icon={faChevronRight}
                            className="w-[10px] text-primary"
                          />
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default SideBar;
