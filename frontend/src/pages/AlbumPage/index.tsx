import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  TextField,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Skeleton,
  Paper,
  useTheme,
  useMediaQuery,
  InputAdornment,
  Snackbar,
  Alert,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Close as CloseIcon,
  PhotoLibrary as PhotoLibraryIcon,
  CloudUpload as CloudUploadIcon,
  Favorite as HeartIcon,
} from "@mui/icons-material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";

// Define the type for our album image
interface AlbumImage {
  id: string;
  filename: string;
  originalName: string;
  path: string;
  mimetype: string;
  size: number;
  caption: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

const AlbumPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const [images, setImages] = useState<AlbumImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<AlbumImage | null>(null);
  const [viewImage, setViewImage] = useState<AlbumImage | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [newCaption, setNewCaption] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });
  const API_URL = "https://tranbaoan.space/api";
  // Function to fetch all images
  const fetchImages = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/album`);
      // Sort by order
      const sortedImages = response.data.sort(
        (a: AlbumImage, b: AlbumImage) => a.order - b.order
      );
      setImages(sortedImages);
    } catch (error) {
      console.error("Error fetching images:", error);
      setNotification({
        open: true,
        message: "Không thể tải ảnh. Vui lòng thử lại sau.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  // Load images on component mount
  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);

      // Create preview URL
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  // Handle image upload
  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);
    formData.append("caption", newCaption);

    // Set order to be the next available number
    const nextOrder =
      images.length > 0 ? Math.max(...images.map((img) => img.order)) + 1 : 1;
    formData.append("order", nextOrder.toString());

    try {
      await axios.post("/api/album", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setNotification({
        open: true,
        message: "Đã tải ảnh lên thành công!",
        severity: "success",
      });

      // Reset form and close dialog
      setFile(null);
      setPreviewUrl(null);
      setNewCaption("");
      setUploadDialogOpen(false);

      // Refresh images
      fetchImages();
    } catch (error) {
      console.error("Error uploading image:", error);
      setNotification({
        open: true,
        message: "Lỗi khi tải ảnh lên. Vui lòng thử lại.",
        severity: "error",
      });
    } finally {
      setUploading(false);
    }
  };

  // Handle image deletion
  const handleDelete = async () => {
    if (!selectedImage) return;

    try {
      await axios.delete(`/api/album/${selectedImage.id}`);

      setNotification({
        open: true,
        message: "Đã xóa ảnh thành công!",
        severity: "success",
      });

      setDeleteDialogOpen(false);
      fetchImages();
    } catch (error) {
      console.error("Error deleting image:", error);
      setNotification({
        open: true,
        message: "Lỗi khi xóa ảnh. Vui lòng thử lại.",
        severity: "error",
      });
    }
  };

  // Handle caption update
  const handleUpdateCaption = async () => {
    if (!selectedImage) return;

    try {
      await axios.patch(`/api/album/${selectedImage.id}`, {
        caption: newCaption,
      });

      setNotification({
        open: true,
        message: "Đã cập nhật chú thích thành công!",
        severity: "success",
      });

      setEditDialogOpen(false);
      fetchImages();
    } catch (error) {
      console.error("Error updating caption:", error);
      setNotification({
        open: true,
        message: "Lỗi khi cập nhật chú thích. Vui lòng thử lại.",
        severity: "error",
      });
    }
  };

  // Handle drag and drop reordering
  const handleDragEnd = async (result: any) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    if (sourceIndex === destinationIndex) return;

    const reorderedImages = Array.from(images);
    const [removed] = reorderedImages.splice(sourceIndex, 1);
    reorderedImages.splice(destinationIndex, 0, removed);

    // Update display immediately for better UX
    setImages(reorderedImages);

    // Prepare data for API
    const imageOrders = reorderedImages.map((image, index) => ({
      id: image.id,
      order: index + 1,
    }));

    try {
      await axios.patch(`${API_URL}/album/reorder`, imageOrders);
    } catch (error) {
      console.error("Error reordering images:", error);
      setNotification({
        open: true,
        message: "Lỗi khi thay đổi thứ tự ảnh. Vui lòng thử lại.",
        severity: "error",
      });
      // Revert to original order if API call fails
      fetchImages();
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Format file size for display
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  // Calculate columns based on screen size
  const getColumnCount = () => {
    if (isMobile) return 1;
    if (isTablet) return 2;
    return 3;
  };

  // Calculate image height based on screen size
  const getImageHeight = () => {
    if (isMobile) return 250;
    if (isTablet) return 220;
    return 250;
  };

  // Get background gradient
  const getBackgroundStyle = {
    background: "linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%)",
    minHeight: "100vh",
    padding: theme.spacing(4),
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
  };

  return (
    <Box sx={getBackgroundStyle}>
      <Container maxWidth="lg">
        <Paper
          elevation={3}
          sx={{
            p: { xs: 2, md: 4 },
            borderRadius: 3,
            background: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(10px)",
            marginBottom: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: { xs: "column", sm: "row" },
              mb: 4,
              gap: 2,
            }}
          >
            <Box sx={{ textAlign: { xs: "center", sm: "left" } }}>
              <Typography
                variant="h3"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  background: "linear-gradient(45deg, #E75480, #FF8E53)",
                  backgroundClip: "text",
                  textFillColor: "transparent",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontSize: { xs: "2rem", md: "2.5rem" },
                }}
              >
                Album Kỷ Niệm
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                sx={{
                  maxWidth: "600px",
                  mt: 1,
                  fontStyle: "italic",
                }}
              >
                Mỗi bức ảnh là một kỷ niệm, mỗi khoảnh khắc là một câu chuyện
                đẹp của chúng ta
              </Typography>
            </Box>

            <Button
              variant="contained"
              size="large"
              startIcon={<CloudUploadIcon />}
              onClick={() => setUploadDialogOpen(true)}
              sx={{
                background: "linear-gradient(45deg, #5F8B4C, #40A578)",
                borderRadius: "12px",
                px: 3,
                py: 1.5,
                fontWeight: "bold",
                "&:hover": {
                  background: "linear-gradient(45deg, #40A578, #5F8B4C)",
                  boxShadow: "0 6px 20px rgba(95, 139, 76, 0.4)",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.2s ease-in-out",
              }}
            >
              Thêm ảnh mới
            </Button>
          </Box>

          {loading ? (
            // Loading skeletons
            <Grid container spacing={3}>
              {[...Array(6)].map((_, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card
                    sx={{ height: "100%", borderRadius: "12px", boxShadow: 3 }}
                  >
                    <Skeleton variant="rectangular" height={getImageHeight()} />
                    <CardContent>
                      <Skeleton variant="text" height={30} width="80%" />
                      <Skeleton variant="text" height={20} width="50%" />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : images.length === 0 ? (
            // Empty state
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                py: 10,
                textAlign: "center",
              }}
            >
              <PhotoLibraryIcon
                sx={{ fontSize: 80, color: "#E75480", opacity: 0.6, mb: 2 }}
              />
              <Typography
                variant="h5"
                component="h2"
                gutterBottom
                color="text.secondary"
              >
                Hãy thêm ảnh kỷ niệm đầu tiên của bạn
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ maxWidth: "600px", mb: 4 }}
              >
                Bắt đầu xây dựng bộ sưu tập những khoảnh khắc đặc biệt giữa hai
                người
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setUploadDialogOpen(true)}
                sx={{
                  background: "linear-gradient(45deg, #E75480, #FF8E53)",
                  borderRadius: "12px",
                  px: 3,
                  py: 1.5,
                }}
              >
                Thêm ảnh đầu tiên
              </Button>
            </Box>
          ) : (
            // Grid of images with drag and drop functionality
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="album-images" direction="horizontal">
                {(provided) => (
                  <Grid
                    container
                    spacing={3}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {images.map((image, index) => (
                      <Draggable
                        key={image.id}
                        draggableId={image.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <Grid
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              ...provided.draggableProps.style,
                              opacity: snapshot.isDragging ? 0.7 : 1,
                            }}
                          >
                            <Card
                              sx={{
                                height: "100%",
                                borderRadius: "12px",
                                overflow: "hidden",
                                boxShadow: 3,
                                position: "relative",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                  transform: "translateY(-5px)",
                                  boxShadow: 6,
                                },
                              }}
                            >
                              <Box
                                onClick={() => {
                                  setViewImage(image);
                                  setViewDialogOpen(true);
                                }}
                                sx={{
                                  cursor: "pointer",
                                  height: getImageHeight(),
                                  position: "relative",
                                  overflow: "hidden",
                                  "&:hover": {
                                    "& .hover-overlay": {
                                      opacity: 1,
                                    },
                                  },
                                }}
                              >
                                <CardMedia
                                  component="img"
                                  height={getImageHeight()}
                                  image={image.path}
                                  alt={image.caption || "Memory photo"}
                                  sx={{
                                    objectFit: "cover",
                                  }}
                                />

                                {/* Hover overlay with heart icon */}
                                <Box
                                  className="hover-overlay"
                                  sx={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: "100%",
                                    background: "rgba(0,0,0,0.3)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    opacity: 0,
                                    transition: "opacity 0.3s ease",
                                  }}
                                >
                                  <HeartIcon
                                    sx={{
                                      fontSize: 60,
                                      color: "#fff",
                                      opacity: 0.8,
                                      filter:
                                        "drop-shadow(0 2px 5px rgba(0,0,0,0.3))",
                                    }}
                                  />
                                </Box>
                              </Box>

                              <CardContent>
                                <Typography
                                  variant="body1"
                                  component="div"
                                  gutterBottom
                                  sx={{
                                    fontWeight: "medium",
                                    minHeight: "48px",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    display: "-webkit-box",
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: "vertical",
                                  }}
                                >
                                  {image.caption || "Khoảnh khắc đáng nhớ"}
                                </Typography>
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                >
                                  {formatDate(image.createdAt)}
                                </Typography>
                              </CardContent>

                              <CardActions
                                sx={{
                                  justifyContent: "space-between",
                                  pt: 0,
                                }}
                              >
                                <Tooltip title="Xem chi tiết">
                                  <IconButton
                                    size="small"
                                    color="primary"
                                    onClick={() => {
                                      setViewImage(image);
                                      setViewDialogOpen(true);
                                    }}
                                  >
                                    <PhotoLibraryIcon />
                                  </IconButton>
                                </Tooltip>

                                <Box>
                                  <Tooltip title="Chỉnh sửa chú thích">
                                    <IconButton
                                      size="small"
                                      color="primary"
                                      onClick={() => {
                                        setSelectedImage(image);
                                        setNewCaption(image.caption);
                                        setEditDialogOpen(true);
                                      }}
                                    >
                                      <EditIcon />
                                    </IconButton>
                                  </Tooltip>

                                  <Tooltip title="Xóa ảnh">
                                    <IconButton
                                      size="small"
                                      color="error"
                                      onClick={() => {
                                        setSelectedImage(image);
                                        setDeleteDialogOpen(true);
                                      }}
                                    >
                                      <DeleteIcon />
                                    </IconButton>
                                  </Tooltip>
                                </Box>
                              </CardActions>
                            </Card>
                          </Grid>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Grid>
                )}
              </Droppable>
            </DragDropContext>
          )}
        </Paper>

        {/* Instructions Paper */}
        <Paper
          elevation={3}
          sx={{
            p: { xs: 2, md: 3 },
            borderRadius: 2,
            background: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Typography
            variant="h6"
            component="h3"
            gutterBottom
            sx={{ color: "#5F8B4C", fontWeight: "bold" }}
          >
            Hướng dẫn sử dụng
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                <CloudUploadIcon sx={{ color: "#E75480", mt: 0.5 }} />
                <Typography variant="body2">
                  <strong>Thêm ảnh mới:</strong> Nhấn vào nút "Thêm ảnh mới" để
                  tải ảnh lên và thêm chú thích
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                <EditIcon sx={{ color: "#E75480", mt: 0.5 }} />
                <Typography variant="body2">
                  <strong>Chỉnh sửa chú thích:</strong> Nhấn vào biểu tượng bút
                  chì để thay đổi chú thích của ảnh
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                <PhotoLibraryIcon sx={{ color: "#E75480", mt: 0.5 }} />
                <Typography variant="body2">
                  <strong>Sắp xếp ảnh:</strong> Kéo và thả các ảnh để thay đổi
                  thứ tự hiển thị trong album
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>

      {/* Upload Dialog */}
      <Dialog
        open={uploadDialogOpen}
        onClose={() => !uploading && setUploadDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: "bold", color: "#5F8B4C" }}>
          Thêm ảnh kỷ niệm mới
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Hãy chọn một ảnh kỷ niệm đẹp và thêm chú thích để lưu giữ khoảnh
            khắc đáng nhớ.
          </DialogContentText>

          <Box sx={{ mb: 3 }}>
            <Button
              variant="outlined"
              component="label"
              fullWidth
              sx={{
                height: 180,
                borderStyle: "dashed",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {previewUrl ? (
                <>
                  <Box
                    component="img"
                    src={previewUrl}
                    alt="Image preview"
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: "100%",
                      bgcolor: "rgba(0,0,0,0.5)",
                      color: "white",
                      p: 1,
                      fontSize: "0.8rem",
                      textAlign: "center",
                    }}
                  >
                    Nhấn để thay đổi
                  </Box>
                </>
              ) : (
                <>
                  <CloudUploadIcon sx={{ fontSize: 40, color: "#5F8B4C" }} />
                  <Typography>Nhấn để chọn ảnh</Typography>
                  <Typography variant="caption" color="text.secondary">
                    Hỗ trợ JPG, PNG, GIF (tối đa 10MB)
                  </Typography>
                </>
              )}
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleFileChange}
                disabled={uploading}
              />
            </Button>
          </Box>

          <TextField
            label="Chú thích"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            value={newCaption}
            onChange={(e) => setNewCaption(e.target.value)}
            placeholder="Kỷ niệm này đại diện cho điều gì đặc biệt?"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <HeartIcon color="secondary" />
                </InputAdornment>
              ),
            }}
            disabled={uploading}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={() => setUploadDialogOpen(false)}
            color="inherit"
            disabled={uploading}
          >
            Hủy
          </Button>
          <Button
            onClick={handleUpload}
            variant="contained"
            disabled={!file || uploading}
            startIcon={
              uploading ? <CircularProgress size={20} /> : <CloudUploadIcon />
            }
          >
            {uploading ? "Đang tải lên..." : "Tải lên"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: "bold", color: "#5F8B4C" }}>
          Chỉnh sửa chú thích
        </DialogTitle>
        <DialogContent>
          {selectedImage && (
            <>
              <Box
                component="img"
                src={selectedImage.path}
                alt={selectedImage.caption || "Memory photo"}
                sx={{
                  width: "100%",
                  height: 200,
                  objectFit: "contain",
                  mb: 2,
                  borderRadius: 1,
                }}
              />

              <TextField
                label="Chú thích mới"
                fullWidth
                multiline
                rows={3}
                variant="outlined"
                value={newCaption}
                onChange={(e) => setNewCaption(e.target.value)}
                placeholder="Nhập chú thích mới cho ảnh này"
              />
            </>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setEditDialogOpen(false)} color="inherit">
            Hủy
          </Button>
          <Button
            onClick={handleUpdateCaption}
            variant="contained"
            color="primary"
          >
            Cập nhật
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle sx={{ color: "error.main", fontWeight: "bold" }}>
          Xác nhận xóa ảnh
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn xóa ảnh này? Hành động này không thể hoàn tác.
          </DialogContentText>
          {selectedImage && (
            <Box
              component="img"
              src={selectedImage.path}
              alt={selectedImage.caption || "Memory photo"}
              sx={{
                width: "100%",
                height: 200,
                objectFit: "contain",
                mt: 2,
                borderRadius: 1,
              }}
            />
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDeleteDialogOpen(false)} color="inherit">
            Hủy
          </Button>
          <Button onClick={handleDelete} variant="contained" color="error">
            Xóa
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Image Dialog */}
      <Dialog
        open={viewDialogOpen}
        onClose={() => setViewDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        {viewImage && (
          <>
            <DialogContent sx={{ p: 0, position: "relative" }}>
              <IconButton
                onClick={() => setViewDialogOpen(false)}
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  bgcolor: "rgba(0,0,0,0.5)",
                  color: "white",
                  "&:hover": {
                    bgcolor: "rgba(0,0,0,0.7)",
                  },
                  zIndex: 1,
                }}
              >
                <CloseIcon />
              </IconButton>

              <Box
                component="img"
                src={viewImage.path}
                alt={viewImage.caption || "Memory photo"}
                sx={{
                  width: "100%",
                  maxHeight: "70vh",
                  objectFit: "contain",
                  bgcolor: "#000",
                }}
              />

              <Box sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  {viewImage.caption || "Khoảnh khắc đáng nhớ"}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    mt: 2,
                    p: 2,
                    bgcolor: "grey.50",
                    borderRadius: 1,
                  }}
                >
                  <Typography variant="body2">
                    <strong>Tên tệp:</strong> {viewImage.originalName}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Kích thước:</strong>{" "}
                    {formatFileSize(viewImage.size)}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Ngày tải lên:</strong>{" "}
                    {formatDate(viewImage.createdAt)}
                  </Typography>
                </Box>
              </Box>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
              <Button
                startIcon={<EditIcon />}
                onClick={() => {
                  setViewDialogOpen(false);
                  setSelectedImage(viewImage);
                  setNewCaption(viewImage.caption);
                  setEditDialogOpen(true);
                }}
              >
                Chỉnh sửa chú thích
              </Button>
              <Button
                variant="contained"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={() => {
                  setViewDialogOpen(false);
                  setSelectedImage(viewImage);
                  setDeleteDialogOpen(true);
                }}
              >
                Xóa ảnh
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Notification Snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={() => setNotification({ ...notification, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setNotification({ ...notification, open: false })}
          severity={notification.severity}
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AlbumPage;
