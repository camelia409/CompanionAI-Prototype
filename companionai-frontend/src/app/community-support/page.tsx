"use client";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUserCircle, FaHeart, FaCommentDots, FaSmileBeam, FaHandsHelping } from "react-icons/fa";

interface Post {
  id: number;
  name: string;
  message: string;
  time: string;
  tag: string;
  likes: number;
}

export default function CommunitySupportPage() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      name: "Anonymous",
      message: "Lately, I’ve been feeling really anxious and stressed. Just needed to share.",
      time: "2 hours ago",
      tag: "💖 Support",
      likes: 4,
    },
    {
      id: 2,
      name: "Meera",
      message: "Does anyone have tips on balancing studies and health? I keep burning out.",
      time: "5 hours ago",
      tag: "❓ Question",
      likes: 7,
    },
  ]);

  const [newPost, setNewPost] = useState("");
  const [anonymous, setAnonymous] = useState(true);
  const [selectedTag, setSelectedTag] = useState("💬 Advice");

  const handlePost = () => {
    if (!newPost.trim()) return;
    const newEntry: Post = {
      id: posts.length + 1,
      name: anonymous ? "Anonymous" : "You",
      message: newPost,
      time: "Just now",
      tag: selectedTag,
      likes: 0,
    };
    setPosts([newEntry, ...posts]);
    setNewPost("");
  };

  const handleLike = (id: number) => {
    setPosts(posts.map(post => post.id === id ? { ...post, likes: post.likes + 1 } : post));
  };

  return (
    <div className="container py-5">
      <h2 className="text-center fw-bold mb-2" style={{ color: "#6a1b9a" }}>
        🤝 Welcome to Your Safe Space
      </h2>
      <p className="text-center text-muted mb-4 fs-5">
        We're here for you — to listen, support, and uplift 🌻
      </p>

      {/* Post Box */}
      <div className="card shadow-sm mb-4 border-0 rounded-4">
        <div className="card-body">
          <textarea
            className="form-control mb-3"
            placeholder="What's on your mind? 🌼 Share a thought, ask for help, or send love..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            rows={3}
          ></textarea>

          <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
            <select
              className="form-select w-auto"
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
            >
              <option>💬 Advice</option>
              <option>💖 Support</option>
              <option>❓ Question</option>
            </select>

            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                checked={anonymous}
                onChange={() => setAnonymous(!anonymous)}
              />
              <label className="form-check-label">Post Anonymously</label>
            </div>
          </div>

          <button className="btn btn-primary float-end" onClick={handlePost}>
            Share with the Community
          </button>
        </div>
      </div>

      {/* Posts Feed */}
      {posts.map((post) => (
        <div key={post.id} className="card mb-3 shadow-sm border-0 rounded-4">
          <div className="card-body">
            <div className="d-flex align-items-center mb-2">
              <FaUserCircle size={28} className="me-2 text-secondary" />
              <strong>{post.name}</strong>
              <span className="text-muted ms-2" style={{ fontSize: "0.85rem" }}>
                {post.time}
              </span>
              <span className="badge bg-light text-dark ms-auto">{post.tag}</span>
            </div>
            <p className="mb-2">{post.message}</p>
            <div className="d-flex gap-3">
              <button className="btn btn-sm btn-outline-danger" onClick={() => handleLike(post.id)}>
                <FaHeart className="me-1" /> {post.likes} {post.likes === 1 ? "Like" : "Likes"}
              </button>
              <button className="btn btn-sm btn-outline-secondary" disabled>
                <FaCommentDots className="me-1" /> Coming Soon
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Gentle Footer */}
      <div className="text-center mt-5">
        <FaHandsHelping size={28} className="text-success mb-2" />
        <p className="text-muted mb-1">
          Every voice matters. Every feeling is valid. 💛
        </p>
        <p className="text-muted">
          Let’s grow stronger together — one post at a time. 🌱
        </p>
      </div>
    </div>
  );
}
