import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import {
  Pencil,
  Trash2,
  UserCircle,
  Send,
  MessageCircle,
  Clock,
  Heart,
  CornerDownRight,
  ThumbsUp,
  Edit,
  Trash,
  Users,
  TrendingUp,
  Sparkles,
  User,
  Crown,
  Gift,
  Target,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import CardContent from "../../components/ui/CardContent";

const Community = () => {
  const [posts, setPosts] = useState([]);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [newPost, setNewPost] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isPosting, setIsPosting] = useState(false);
  const [replyContent, setReplyContent] = useState({});
  const [editingReply, setEditingReply] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [confirmDelete, setConfirmDelete] = useState({
    type: null,
    id: null,
    replyIdx: null,
  });

  const handleConfirmDelete = async () => {
    if (confirmDelete.type === "post") {
      await handleDelete(confirmDelete.id);
    } else if (confirmDelete.type === "reply") {
      await handleDeleteReply(confirmDelete.id, confirmDelete.replyIdx);
    }
    setConfirmDelete({ type: null, id: null, replyIdx: null });
  };

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const res = await api.get("/community");
      setPosts(res.data);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const res = await api.get("/auth/profile");
      setCurrentUser(res.data);
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
    fetchPosts();
  }, []);

  const handlePost = async () => {
    if (!newPost.trim()) return;
    try {
      setIsPosting(true);
      await api.post("/community/create", { content: newPost });
      setNewPost("");
      fetchPosts();
    } catch (err) {
      console.error("Error creating post:", err);
    } finally {
      setIsPosting(false);
    }
  };

  const handleEdit = async (id) => {
    try {
      await api.put(`/community/${id}`, { content: editContent });
      setEditingPostId(null);
      setEditContent("");
      fetchPosts();
    } catch (err) {
      console.error("Error editing post:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/community/${id}`);
      fetchPosts();
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  const handleLike = async (id) => {
    try {
      await api.post(`/community/${id}/like`);
      fetchPosts();
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };

  const handleReply = async (postId) => {
    const content = replyContent[postId];
    if (!content?.trim()) return;
    try {
      await api.post(`/community/${postId}/reply`, { content });
      setReplyContent({ ...replyContent, [postId]: "" });
      fetchPosts();
    } catch (err) {
      console.error("Error replying to post:", err);
    }
  };

  const handleEditReply = async (postId, replyIdx, newContent) => {
    try {
      await api.put(`/community/${postId}/reply/${replyIdx}`, {
        content: newContent,
      });
      setEditingReply({ ...editingReply, [`${postId}_${replyIdx}`]: null });
      fetchPosts();
    } catch (err) {
      console.error("Error editing reply:", err);
    }
  };

  const handleDeleteReply = async (postId, replyIdx) => {
    try {
      await api.delete(`/community/${postId}/reply/${replyIdx}`);
      fetchPosts();
    } catch (err) {
      console.error("Error deleting reply:", err);
    }
  };

  const handleLikeReply = async (postId, replyIdx) => {
    try {
      await api.post(`/community/${postId}/reply/${replyIdx}/like`);
      fetchPosts();
    } catch (err) {
      console.error("Error liking reply:", err);
    }
  };

  const formatTimeAgo = (dateString) => {
    if (!dateString) return "Just now";
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case "admin":
        return <Crown className="w-3 h-3" />;
      case "donor":
        return <Gift className="w-3 h-3" />;
      case "recipient":
        return <Target className="w-3 h-3" />;
      default:
        return <User className="w-3 h-3" />;
    }
  };

  const getRoleStyles = (role) => {
    switch (role) {
      case "admin":
        return "bg-gradient-to-r from-red-500 to-pink-500 text-white";
      case "donor":
        return "bg-gradient-to-r from-blue-500 to-cyan-500 text-white";
      case "recipient":
        return "bg-gradient-to-r from-green-500 to-emerald-500 text-white";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3"
          >
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Community Forum
              </h1>
              <p className="text-gray-600 text-sm">Connect, share, and support each other</p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-8 px-4">
        {/* Create Post Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="mb-8 overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <UserCircle className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <textarea
                    className="w-full border-2 border-gray-200 rounded-xl p-4 resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 placeholder-gray-400"
                    placeholder="What's on your mind? Share your thoughts with the community..."
                    rows={4}
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                  />
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Sparkles className="w-4 h-4" />
                      <span>Share your story, ask questions, or offer support</span>
                    </div>
                    <Button
                      onClick={handlePost}
                      disabled={isPosting || !newPost.trim()}
                      className="min-w-[100px]"
                    >
                      {isPosting ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Posting...</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Send className="w-4 h-4" />
                          <span>Post</span>
                        </div>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Posts List */}
        <div className="space-y-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-500">Loading community posts...</p>
              </div>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No posts yet</h3>
              <p className="text-gray-500">Be the first to share something with the community!</p>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {posts.map((post, index) => (
                <motion.div
                  key={post._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300">
                    <CardContent className="p-6">
                      {/* Post Header */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className="flex-shrink-0">
                          <div className="relative">
                            <img
                              src={post.avatar || "/default-avatar.png"}
                              alt="avatar"
                              className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                            />
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                              <div className={`w-4 h-4 rounded-full flex items-center justify-center ${getRoleStyles(post.role)}`}>
                                {getRoleIcon(post.role)}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-gray-900">{post.username}</h3>
                            <div className={`px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1 ${getRoleStyles(post.role)}`}>
                              {getRoleIcon(post.role)}
                              <span>{post.role}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Clock className="w-3 h-3" />
                            <span>{formatTimeAgo(post.createdAt)}</span>
                          </div>
                        </div>
                        {post.username === currentUser.username && (
                          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => {
                                setEditingPostId(post._id);
                                setEditContent(post.content);
                              }}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() =>
                                setConfirmDelete({ type: "post", id: post._id })
                              }
                            >
                              <Trash className="w-4 h-4 text-red-500" />
                            </Button>
                          </div>
                        )}
                      </div>

                      {/* Post Content */}
                      <div className="mb-4">
                        {editingPostId === post._id ? (
                          <div className="space-y-3">
                            <textarea
                              className="w-full border-2 border-gray-200 rounded-xl p-4 resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                              rows={4}
                              value={editContent}
                              onChange={(e) => setEditContent(e.target.value)}
                            />
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={() => handleEdit(post._id)}
                              >
                                <Send className="w-4 h-4" />
                                Save Changes
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setEditingPostId(null);
                                  setEditContent("");
                                }}
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="prose prose-gray max-w-none">
                            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                              {post.content}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Post Actions */}
                      <div className="flex items-center gap-4 py-2 border-t border-gray-100">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleLike(post._id)}
                            className="flex items-center gap-2"
                          >
                            <Heart className={`w-4 h-4 ${post.likes?.includes(currentUser.id) ? 'text-red-500 fill-red-500' : 'text-gray-500'}`} />
                            <span className="text-sm font-medium">{post.likes?.length || 0}</span>
                          </Button>
                        </motion.div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="flex items-center gap-2"
                        >
                          <MessageCircle className="w-4 h-4 text-gray-500" />
                          <span className="text-sm font-medium">{post.replies?.length || 0}</span>
                        </Button>
                      </div>

                      {/* Replies */}
                      {post.replies?.length > 0 && (
                        <div className="mt-4 space-y-3">
                          {post.replies.map((reply, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              className="ml-6 p-4 bg-gray-50 rounded-xl border-l-4 border-blue-200"
                            >
                              {editingReply[`${post._id}_${idx}`] ? (
                                <div className="space-y-3">
                                  <input
                                    value={editingReply[`${post._id}_${idx}`]}
                                    onChange={(e) =>
                                      setEditingReply({
                                        ...editingReply,
                                        [`${post._id}_${idx}`]: e.target.value,
                                      })
                                    }
                                    className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                                  />
                                  <div className="flex gap-2">
                                    <Button
                                      size="sm"
                                      onClick={() =>
                                        handleEditReply(
                                          post._id,
                                          idx,
                                          editingReply[`${post._id}_${idx}`]
                                        )
                                      }
                                    >
                                      Save
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() =>
                                        setEditingReply({
                                          ...editingReply,
                                          [`${post._id}_${idx}`]: null,
                                        })
                                      }
                                    >
                                      Cancel
                                    </Button>
                                  </div>
                                </div>
                              ) : (
                                <div>
                                  <div className="flex items-center gap-2 mb-2">
                                    <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                                      <User className="w-3 h-3 text-gray-600" />
                                    </div>
                                    <span className="font-medium text-sm text-gray-900">
                                      {reply.username}
                                    </span>
                                    <div className={`px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1 ${getRoleStyles(reply.role)}`}>
                                      {getRoleIcon(reply.role)}
                                      <span>{reply.role}</span>
                                    </div>
                                  </div>
                                  <p className="text-gray-700 text-sm leading-relaxed mb-2">
                                    {reply.content}
                                  </p>
                                  <div className="flex items-center gap-3 text-xs text-gray-500">
                                    <span>{formatTimeAgo(reply.createdAt)}</span>
                                    <Button
                                      size="xs"
                                      variant="ghost"
                                      onClick={() => handleLikeReply(post._id, idx)}
                                      className="flex items-center gap-1"
                                    >
                                      <ThumbsUp className="w-3 h-3" />
                                      <span>{reply.likes || 0}</span>
                                    </Button>
                                    {reply.username === currentUser.username && (
                                      <>
                                        <Button
                                          size="xs"
                                          variant="ghost"
                                          onClick={() =>
                                            setEditingReply({
                                              ...editingReply,
                                              [`${post._id}_${idx}`]: reply.content,
                                            })
                                          }
                                        >
                                          <Edit className="w-3 h-3" />
                                        </Button>
                                        <Button
                                          size="xs"
                                          variant="ghost"
                                          onClick={() =>
                                            setConfirmDelete({
                                              type: "reply",
                                              id: post._id,
                                              replyIdx: idx,
                                            })
                                          }
                                        >
                                          <Trash className="w-3 h-3 text-red-500" />
                                        </Button>
                                      </>
                                    )}
                                  </div>
                                </div>
                              )}
                            </motion.div>
                          ))}
                        </div>
                      )}

                      {/* Reply Input */}
                      <div className="mt-4 flex gap-3">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                            <UserCircle className="w-4 h-4 text-white" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <input
                            placeholder="Write a thoughtful reply..."
                            value={replyContent[post._id] || ""}
                            onChange={(e) =>
                              setReplyContent({
                                ...replyContent,
                                [post._id]: e.target.value,
                              })
                            }
                            className="w-full border-2 border-gray-200 rounded-xl px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 placeholder-gray-400"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleReply(post._id);
                              }
                            }}
                          />
                          <div className="flex justify-end mt-2">
                            <Button
                              size="sm"
                              onClick={() => handleReply(post._id)}
                              disabled={!replyContent[post._id]?.trim()}
                            >
                              <CornerDownRight className="w-4 h-4" />
                              Reply
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {confirmDelete.type && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full"
            >
              <div className="text-center">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trash2 className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Delete {confirmDelete.type}?
                </h3>
                <p className="text-gray-500 mb-6">
                  This action cannot be undone. Are you sure you want to proceed?
                </p>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() =>
                      setConfirmDelete({ type: null, id: null, replyIdx: null })
                    }
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleConfirmDelete}
                    className="flex-1 bg-red-600 hover:bg-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Community;