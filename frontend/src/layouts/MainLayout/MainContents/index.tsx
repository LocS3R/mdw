import {
  Container,
  Grid,
  Typography,
  Paper,
  Box,
  useTheme,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import imgEmUrl from "../../../assets/Em.jpeg";
import imgAnhUrl from "../../../assets/Anh.jpg";
// Import các hình ảnh kỷ niệm
import img1Url from "../../../assets/album/alb1.jpg"; // Thay thế bằng đường dẫn thực tế
import img2Url from "../../../assets/album/alb2.jpg"; // Thay thế bằng đường dẫn thực tế
import img3Url from "../../../assets/album/alb3.jpg"; // Thay thế bằng đường dẫn thực tế
import img4Url from "../../../assets/album/alb4.jpeg"; // Thay thế bằng đường dẫn thực tế

const MainContents: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Định nghĩa ngày bắt đầu yêu nhau
  const startDate = new Date("2025-03-25");
  const [daysCount, setDaysCount] = useState(0);
  const [beating, setBeating] = useState(true);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  // Các trạng thái cho slideshow
  const memories = [
    {
      id: 1,
      src: img1Url || "/api/placeholder/600/400",
      alt: "Kỷ niệm đầu tiên",
      caption: "Bé iuuuu giỏi quáaaaa ❤",
    },
    {
      id: 2,
      src: img2Url || "/api/placeholder/600/400",
      alt: "Kỷ niệm lần hẹn hò",
      caption: "Ưu điểm thích đi là, Nhược điểm hay đi làm muộn",
    },
    {
      id: 3,
      src: img3Url || "/api/placeholder/600/400",
      alt: "Kỷ niệm sinh nhật",
      caption: "No cap",
    },
    {
      id: 4,
      src: img4Url || "/api/placeholder/600/400",
      alt: "Kỷ niệm du lịch",
      caption: "Đi ăn hôm bé tốt nghiệp",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  // Tính toán thời gian đã yêu nhau
  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const timeDiff = now.getTime() - startDate.getTime();

      const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
      const hoursDiff = Math.floor(
        (timeDiff % (1000 * 3600 * 24)) / (1000 * 3600)
      );
      const minutesDiff = Math.floor((timeDiff % (1000 * 3600)) / (1000 * 60));
      const secondsDiff = Math.floor((timeDiff % (1000 * 60)) / 1000);

      setDaysCount(daysDiff);
      setHours(hoursDiff);
      setMinutes(minutesDiff);
      setSeconds(secondsDiff);
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000); // Cập nhật mỗi giây

    return () => clearInterval(timer);
  }, []);

  // Hiệu ứng đập trái tim
  useEffect(() => {
    const heartbeatInterval = setInterval(() => {
      setBeating((prev) => !prev);
    }, 500);

    return () => clearInterval(heartbeatInterval);
  }, []);

  // Hiệu ứng tự động chuyển slide
  useEffect(() => {
    let slideInterval: number | undefined;

    if (isAutoplay) {
      slideInterval = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % memories.length);
      }, 3000); // Chuyển slide mỗi 3 giây
    }

    return () => {
      if (slideInterval) {
        clearInterval(slideInterval);
      }
    };
  }, [isAutoplay, memories.length]);

  // Hàm chuyển slide
  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % memories.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + memories.length) % memories.length
    );
  };

  // Tạm dừng autoplay khi hover vào slideshow
  const handleMouseEnter = () => {
    setIsAutoplay(false);
  };

  const handleMouseLeave = () => {
    setIsAutoplay(true);
  };

  // Tạo gradient background cho trang
  const backgroundStyle = {
    background: "linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%)",
    minHeight: "100vh",
    padding: theme.spacing(4),
    paddingBottom: theme.spacing(10),
  };

  return (
    <Box sx={backgroundStyle}>
      <Container>
        <Paper
          elevation={5}
          sx={{
            borderRadius: "16px",
            overflow: "hidden",
            background: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(10px)",
            mb: 4,
            p: 3,
            textAlign: "center",
            boxShadow: "0 8px 32px rgba(31, 38, 135, 0.15)",
            border: "1px solid rgba(255, 255, 255, 0.18)",
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: "bold",
              background: "linear-gradient(45deg, #FF6B6B, #FF8E53)",
              backgroundClip: "text",
              textFillColor: "transparent",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 2,
              fontSize: { xs: "2rem", md: "3rem" },
            }}
          >
            Ngày tình yêu bắt đầu
          </Typography>
          <Typography
            variant="h4"
            sx={{
              color: "#5F8B4C",
              fontWeight: "bold",
              fontSize: { xs: "1.5rem", md: "2.5rem" },
            }}
          >
            {startDate.toLocaleDateString("vi-VN")}
          </Typography>
        </Paper>

        <Grid container spacing={4}>
          {/* Phần thông tin của Anh */}
          <Grid item xs={12} md={5}>
            <Paper
              elevation={8}
              sx={{
                p: 3,
                height: "100%",
                borderRadius: "16px",
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 12px 28px rgba(0, 0, 0, 0.15)",
                },
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Box
                    component="img"
                    sx={{
                      height: 350,
                      width: "100%",
                      objectFit: "cover",
                      borderRadius: "12px",
                      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
                      border: "4px solid white",
                    }}
                    alt="Hình ảnh của Anh"
                    src={imgAnhUrl}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="h3"
                    component="h2"
                    gutterBottom
                    textAlign="center"
                    sx={{
                      fontWeight: "bold",
                      color: "#4E7A3B",
                      fontSize: { xs: "2rem", md: "2.5rem" },
                    }}
                  >
                    Anh
                  </Typography>
                  <Box
                    sx={{
                      p: 2,
                      backgroundColor: "rgba(95, 139, 76, 0.05)",
                      borderRadius: "8px",
                      border: "1px dashed #5F8B4C",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{ mb: 1, fontSize: "1.1rem" }}
                    >
                      <strong>Họ và tên:</strong> Nguyễn Đại Lộc
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ mb: 1, fontSize: "1.1rem" }}
                    >
                      <strong>Ngày sinh:</strong> 15/10/2002
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: "1.1rem" }}>
                      <strong>Sở thích:</strong> Chọc bé duiiiii ❤
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Phần hiển thị trái tim và số ngày */}
          <Grid
            item
            xs={12}
            md={2}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Paper
              elevation={4}
              sx={{
                p: 3,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "16px",
                background: "linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  transform: beating ? "scale(1.1)" : "scale(1)",
                  transition: "transform 0.5s",
                  mb: 2,
                }}
              >
                <FavoriteIcon
                  sx={{
                    fontSize: 120,
                    color: "white",
                    filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))",
                    animation: "heartbeat 1s infinite",
                  }}
                />
                <Typography
                  variant="h3"
                  component="div"
                  sx={{
                    position: "absolute",
                    top: "45%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    color: "#E75480",
                    fontWeight: "bold",
                    textAlign: "center",
                    lineHeight: 1,
                    textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  {daysCount}
                </Typography>
              </Box>
              <Typography
                variant="h6"
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  textShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                }}
              >
                Ngày bên nhau
              </Typography>

              <Box sx={{ mt: 2, color: "white", textAlign: "center" }}>
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                  {hours} giờ {minutes} phút
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  {seconds} giây
                </Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Phần thông tin của Em */}
          <Grid item xs={12} md={5}>
            <Paper
              elevation={8}
              sx={{
                p: 3,
                height: "100%",
                borderRadius: "16px",
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 12px 28px rgba(0, 0, 0, 0.15)",
                },
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Box
                    component="img"
                    sx={{
                      height: 350,
                      width: "100%",
                      objectFit: "cover",
                      borderRadius: "12px",
                      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
                      border: "4px solid white",
                    }}
                    alt="Hình ảnh của Em"
                    src={imgEmUrl}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="h3"
                    component="h2"
                    gutterBottom
                    textAlign="center"
                    sx={{
                      fontWeight: "bold",
                      color: "#E75480",
                      fontSize: { xs: "2rem", md: "2.5rem" },
                    }}
                  >
                    Em (Bé)
                  </Typography>
                  <Box
                    sx={{
                      p: 2,
                      backgroundColor: "rgba(231, 84, 128, 0.05)",
                      borderRadius: "8px",
                      border: "1px dashed #E75480",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{ mb: 1, fontSize: "1.1rem" }}
                    >
                      <strong>Họ và tên:</strong> Trần Bảo Ân
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ mb: 1, fontSize: "1.1rem" }}
                    >
                      <strong>Ngày sinh:</strong> 08/12/2003
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: "1.1rem" }}>
                      <strong>Sở thích:</strong> Nghe nhạc Hoàng Dũng, Giuỗi chữ
                      trên MXH (tiktok, locket)
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Phần kỷ niệm đáng nhớ */}
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Paper
              elevation={5}
              sx={{
                p: 4,
                borderRadius: "16px",
                background: "linear-gradient(to right, #ffffff, #f8f9fa)",
                border: "1px solid rgba(231, 84, 128, 0.2)",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
              }}
            >
              <Typography
                variant="h3"
                component="h2"
                gutterBottom
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "#5F8B4C",
                  fontSize: { xs: "1.8rem", md: "2.5rem" },
                  mb: 3,
                }}
              >
                Kỷ niệm đáng nhớ
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  textAlign: "center",
                  fontStyle: "italic",
                  mb: 2,
                  color: "#555",
                  fontSize: { xs: "1.1rem", md: "1.3rem" },
                }}
              >
                "Tình yêu không phải về những gì xuất hiện trong suốt một khoảnh
                khắc, mà là những gì được xây dựng từng ngày."
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  textAlign: "center",
                  fontSize: "1.2rem",
                  lineHeight: 1.8,
                }}
              >
                Thời gian trôi qua thật nhanh, chúng ta đã bên nhau{" "}
                <strong>{daysCount} ngày</strong> với rất nhiều kỷ niệm đẹp! Mỗi
                giây phút bên nhau đều là những khoảnh khắc đáng trân trọng, và
                chúng ta sẽ tiếp tục viết nên câu chuyện tình yêu của riêng
                mình.
              </Typography>
            </Paper>
          </Grid>

          {/* Phần slideshow ảnh kỷ niệm */}
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Paper
              elevation={5}
              sx={{
                p: 4,
                borderRadius: "16px",
                background: "linear-gradient(to right, #ffffff, #f8f9fa)",
                border: "1px solid rgba(231, 84, 128, 0.2)",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
              }}
            >
              <Typography
                variant="h3"
                component="h2"
                gutterBottom
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "#E75480",
                  fontSize: { xs: "1.8rem", md: "2.5rem" },
                  mb: 3,
                }}
              >
                Album kỷ niệm
              </Typography>

              {/* Slideshow container */}
              <Box
                sx={{
                  position: "relative",
                  maxWidth: "800px",
                  margin: "0 auto",
                  overflow: "hidden",
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {/* Slides */}
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    height: { xs: "250px", sm: "350px", md: "450px" },
                    borderRadius: "12px",
                    overflow: "hidden",
                    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
                    border: "5px solid white",
                  }}
                >
                  {memories.map((memory, index) => (
                    <Box
                      key={memory.id}
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        opacity: index === currentSlide ? 1 : 0,
                        transition: "opacity 1s ease-in-out",
                        zIndex: index === currentSlide ? 1 : 0,
                      }}
                    >
                      <Box
                        component="img"
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain", // Đảm bảo ảnh giữ nguyên tỉ lệ mà không bị cắt
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        alt={memory.alt}
                        src={memory.src}
                      />
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          width: "100%",
                          background:
                            "linear-gradient(transparent, rgba(0,0,0,0.7))",
                          padding: "20px 15px 15px",
                          color: "white",
                          textAlign: "center",
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: "bold", color: "white" }}
                        >
                          {memory.caption}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>

                {/* Controls */}
                <IconButton
                  onClick={prevSlide}
                  sx={{
                    position: "absolute",
                    left: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    backgroundColor: "rgba(255,255,255,0.5)",
                    color: "#333",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.8)",
                    },
                    zIndex: 2,
                  }}
                >
                  <ChevronLeftIcon />
                </IconButton>

                <IconButton
                  onClick={nextSlide}
                  sx={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    backgroundColor: "rgba(255,255,255,0.5)",
                    color: "#333",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.8)",
                    },
                    zIndex: 2,
                  }}
                >
                  <ChevronRightIcon />
                </IconButton>

                {/* Indicators */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 2,
                  }}
                >
                  {memories.map((_, index) => (
                    <Box
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      sx={{
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%",
                        margin: "0 5px",
                        backgroundColor:
                          currentSlide === index ? "#E75480" : "#ccc",
                        cursor: "pointer",
                        transition: "background-color 0.3s",
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <style>{`
        @keyframes heartbeat {
          0% {
            transform: scale(1);
            filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
          }
          50% {
            transform: scale(1.3);
            filter: drop-shadow(0 6px 12px rgba(255, 0, 0, 0.3));
          }
          100% {
            transform: scale(1);
            filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
          }
        }
        
        body {
          margin: 0;
          padding: 0;
          font-family: 'Roboto', 'Helvetica', sans-serif;
        }
        
        @media (max-width: 600px) {
          .responsive-text {
            font-size: 1.5rem !important;
          }
        }
      `}</style>
    </Box>
  );
};

export default MainContents;
