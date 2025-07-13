import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // State cho tab hiện tại
  const [activeTab, setActiveTab] = useState('schedule');
  
  // State cho cảm xúc
  const moods = [
    { emoji: '😊', text: 'Vui vẻ' },
    { emoji: '😢', text: 'Buồn' },
    { emoji: '😴', text: 'Mệt mỏi' },
    { emoji: '😤', text: 'Tức giận' },
    { emoji: '🤔', text: 'Suy nghĩ' },
    { emoji: '😍', text: 'Hạnh phúc' },
    { emoji: '😰', text: 'Lo lắng' },
    { emoji: '🤗', text: 'Thân thiện' }
  ];
  const [currentMoodIndex, setCurrentMoodIndex] = useState(0);
  
  // State cho thời gian biểu
  const [tasks, setTasks] = useState([
    { id: 1, startTime: '08:00', endTime: '09:30', task: 'Học Toán', completed: false },
    { id: 2, startTime: '10:00', endTime: '11:30', task: 'Học Văn', completed: false },
    { id: 3, startTime: '14:00', endTime: '15:30', task: 'Học Anh', completed: false }
  ]);
  const [newTask, setNewTask] = useState({ startTime: '', endTime: '', task: '' });
  
  // State cho ghi chú
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    password: '',
    deadline: ''
  });
  const [editorFontSize, setEditorFontSize] = useState('16px');
  
  // State cho dịch thuật
  const [translation, setTranslation] = useState({
    fromLang: 'auto',
    toLang: 'vi',
    inputText: '',
    outputText: ''
  });
  
  // State cho AI Chat
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  
  // State cho giải trí
  const [musicPlaylist, setMusicPlaylist] = useState([]);
  const [musicInput, setMusicInput] = useState('');
  const [videoInput, setVideoInput] = useState('');
  const [currentVideo, setCurrentVideo] = useState('');
  
  // Load dữ liệu từ localStorage khi component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('ai-assistant-tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
    
    const savedNotes = localStorage.getItem('ai-assistant-notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
    
    const savedPlaylist = localStorage.getItem('ai-assistant-playlist');
    if (savedPlaylist) {
      setMusicPlaylist(JSON.parse(savedPlaylist));
    }
  }, []);
  
  // Lưu dữ liệu vào localStorage khi state thay đổi
  useEffect(() => {
    localStorage.setItem('ai-assistant-tasks', JSON.stringify(tasks));
  }, [tasks]);
  
  useEffect(() => {
    localStorage.setItem('ai-assistant-notes', JSON.stringify(notes));
  }, [notes]);
  
  useEffect(() => {
    localStorage.setItem('ai-assistant-playlist', JSON.stringify(musicPlaylist));
  }, [musicPlaylist]);
  
  // Chức năng cảm xúc
  const changeMood = (direction) => {
    if (direction === 'prev') {
      setCurrentMoodIndex((prev) => (prev - 1 + moods.length) % moods.length);
    } else {
      setCurrentMoodIndex((prev) => (prev + 1) % moods.length);
    }
  };
  
  // Chức năng tối ưu hóa thời gian biểu
  const optimizeSchedule = () => {
    alert('AI đang phân tích thời gian biểu của bạn và đưa ra gợi ý tối ưu hóa...');
    // Có thể tích hợp với API AI thực tế ở đây
  };
  
  // Chức năng thời gian biểu
  const addTask = () => {
    if (newTask.startTime && newTask.endTime && newTask.task) {
      const task = {
        id: Date.now(),
        ...newTask,
        completed: false
      };
      setTasks([...tasks, task]);
      setNewTask({ startTime: '', endTime: '', task: '' });
    }
  };
  
  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };
  
  const deleteTask = (id) => {
    if (confirm('Bạn có chắc chắn muốn xóa công việc này?')) {
      setTasks(tasks.filter(task => task.id !== id));
    }
  };
  
  // Chức năng ghi chú
  const saveNote = () => {
    if (newNote.title && newNote.content) {
      const note = {
        id: Date.now(),
        ...newNote,
        createdAt: new Date().toLocaleString('vi-VN'),
        hasPassword: !!newNote.password
      };
      setNotes([...notes, note]);
      setNewNote({ title: '', content: '', password: '', deadline: '' });
      alert('Ghi chú đã được lưu thành công!');
    } else {
      alert('Vui lòng nhập tên ghi chú và nội dung!');
    }
  };
  
  const deleteNote = (id) => {
    if (confirm('Bạn có chắc chắn muốn xóa ghi chú này?')) {
      setNotes(notes.filter(note => note.id !== id));
    }
  };
  
  const createLock = () => {
    if (!newNote.password) {
      alert('Vui lòng nhập mật khẩu trước khi tạo khóa!');
      return;
    }
    alert('Khóa bảo vệ đã được tạo cho ghi chú này!');
  };
  
  // Chức năng định dạng văn bản
  const formatText = (command, value = null) => {
    document.execCommand(command, false, value);
  };
  
  // Chức năng dịch thuật
  const translateText = () => {
    if (!translation.inputText.trim()) {
      alert('Vui lòng nhập văn bản cần dịch!');
      return;
    }
    
    // Mock translation - trong thực tế có thể tích hợp Google Translate API
    const mockTranslations = {
      'Hello': 'Xin chào',
      'How are you?': 'Bạn có khỏe không?',
      'Thank you': 'Cảm ơn bạn',
      'Good morning': 'Chào buổi sáng',
      'Good night': 'Chúc ngủ ngon'
    };
    
    const result = mockTranslations[translation.inputText] || 
                  `Đã dịch từ ${translation.fromLang} sang ${translation.toLang}: ${translation.inputText}`;
    
    setTranslation(prev => ({ ...prev, outputText: result }));
  };
  
  // Chức năng AI Chat
  const sendChatMessage = () => {
    if (!chatInput.trim()) return;
    
    const userMessage = { type: 'user', content: chatInput, timestamp: new Date() };
    setChatMessages(prev => [...prev, userMessage]);
    
    // Mock AI response
    setTimeout(() => {
      const aiResponses = [
        'Tôi hiểu câu hỏi của bạn. Đây là một chủ đề thú vị!',
        'Cảm ơn bạn đã chia sẻ. Tôi có thể giúp bạn thêm về vấn đề này.',
        'Đó là một câu hỏi hay! Hãy để tôi suy nghĩ và đưa ra câu trả lời tốt nhất.',
        'Tôi rất vui được trò chuyện với bạn. Bạn có câu hỏi gì khác không?',
        'Dựa trên thông tin bạn cung cấp, tôi nghĩ rằng...'
      ];
      
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      const aiMessage = { type: 'ai', content: randomResponse, timestamp: new Date() };
      setChatMessages(prev => [...prev, aiMessage]);
    }, 1000);
    
    setChatInput('');
  };
  
  // Chức năng giải trí
  const addMusic = () => {
    if (!musicInput.trim()) {
      alert('Vui lòng nhập link nhạc!');
      return;
    }
    
    // Extract video ID from YouTube URL (simplified)
    let videoId = '';
    if (musicInput.includes('youtube.com/watch?v=')) {
      videoId = musicInput.split('v=')[1].split('&')[0];
    } else if (musicInput.includes('youtu.be/')) {
      videoId = musicInput.split('youtu.be/')[1].split('?')[0];
    }
    
    const song = {
      id: Date.now(),
      title: `Bài hát ${musicPlaylist.length + 1}`,
      url: musicInput,
      videoId: videoId
    };
    
    setMusicPlaylist([...musicPlaylist, song]);
    setMusicInput('');
    alert('Đã thêm bài hát vào playlist!');
  };
  
  const removeMusicFromPlaylist = (id) => {
    setMusicPlaylist(musicPlaylist.filter(song => song.id !== id));
  };
  
  const loadVideo = () => {
    if (!videoInput.trim()) {
      alert('Vui lòng nhập link video!');
      return;
    }
    
    setCurrentVideo(videoInput);
    alert('Video đã được tải!');
  };
  
  // Render các tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'schedule':
        return (
          <div className="content-section">
            {/* Cảm xúc hôm nay */}
            <div className="mood-section">
              <h3>☀️ Cảm Xúc Hôm Nay</h3>
              <div className="mood-selector">
                <button className="mood-btn" onClick={() => changeMood('prev')}>‹</button>
                <div className="mood-display">
                  <div className="mood-emoji">{moods[currentMoodIndex].emoji}</div>
                  <div className="mood-text">{moods[currentMoodIndex].text}</div>
                </div>
                <button className="mood-btn" onClick={() => changeMood('next')}>›</button>
              </div>
            </div>
            
            {/* AI Hỗ trợ sắp xếp */}
            <div className="ai-optimization-section">
              <h3>🤖 AI Hỗ Trợ Sắp Xếp TGB</h3>
              <p>AI sẽ giúp bạn tối ưu hóa thời gian biểu dựa trên mức độ ưu tiên và thói quen học tập.</p>
              <button className="optimize-btn" onClick={optimizeSchedule}>✨ Tối ưu hóa</button>
            </div>
            
            {/* Thời gian biểu */}
            <div className="schedule-section">
              <h3>📅 Thời Gian Biểu</h3>
              <div className="add-task">
                <input
                  type="time"
                  className="time-input"
                  placeholder="Thời gian bắt đầu"
                  value={newTask.startTime}
                  onChange={(e) => setNewTask({...newTask, startTime: e.target.value})}
                />
                <input
                  type="time"
                  className="time-input"
                  placeholder="Thời gian kết thúc"
                  value={newTask.endTime}
                  onChange={(e) => setNewTask({...newTask, endTime: e.target.value})}
                />
                <input
                  type="text"
                  className="task-input"
                  placeholder="Nhập công việc..."
                  value={newTask.task}
                  onChange={(e) => setNewTask({...newTask, task: e.target.value})}
                />
                <button className="add-btn" onClick={addTask}>+ Thêm</button>
              </div>
              
              <div className="task-list">
                {tasks.map(task => (
                  <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                    <div className="task-time">{task.startTime} - {task.endTime}</div>
                    <div className="task-content">{task.task}</div>
                    <div className="task-actions">
                      <button 
                        className="toggle-btn" 
                        onClick={() => toggleTaskCompletion(task.id)}
                      >
                        ⭕
                      </button>
                      <button 
                        className="delete-btn" 
                        onClick={() => deleteTask(task.id)}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
        
      case 'notes':
        return (
          <div className="content-section">
            <div className="notes-section">
              <h3>📝 Tạo ghi chú</h3>
              <div className="note-form">
                <input
                  type="text"
                  className="note-title-input"
                  placeholder="Tên ghi chú..."
                  value={newNote.title}
                  onChange={(e) => setNewNote({...newNote, title: e.target.value})}
                />
                <input
                  type="password"
                  className="note-password-input"
                  placeholder="Mật khẩu (tùy chọn)"
                  value={newNote.password}
                  onChange={(e) => setNewNote({...newNote, password: e.target.value})}
                />
                <input
                  type="datetime-local"
                  className="note-deadline-input"
                  placeholder="Thời hạn"
                  value={newNote.deadline}
                  onChange={(e) => setNewNote({...newNote, deadline: e.target.value})}
                />
                <div className="note-actions">
                  <button className="lock-btn" onClick={createLock}>🔒 Tạo khóa</button>
                  <button className="save-btn" onClick={saveNote}>💾 Lưu</button>
                </div>
              </div>
              
              <div className="editor-toolbar">
                <select 
                  className="font-size-select"
                  value={editorFontSize}
                  onChange={(e) => setEditorFontSize(e.target.value)}
                >
                  <option value="12px">12px</option>
                  <option value="14px">14px</option>
                  <option value="16px">16px</option>
                  <option value="18px">18px</option>
                  <option value="20px">20px</option>
                  <option value="24px">24px</option>
                  <option value="28px">28px</option>
                  <option value="32px">32px</option>
                </select>
                <button className="toolbar-btn" onClick={() => formatText('bold')}>B</button>
                <button className="toolbar-btn" onClick={() => formatText('italic')}>I</button>
                <button className="toolbar-btn" onClick={() => formatText('underline')}>U</button>
                <button className="toolbar-btn" onClick={() => formatText('justifyLeft')}>⬅️</button>
                <button className="toolbar-btn" onClick={() => formatText('justifyCenter')}>⬆️</button>
                <button className="toolbar-btn" onClick={() => formatText('justifyRight')}>➡️</button>
                <button className="toolbar-btn" onClick={() => formatText('justifyFull')}>⬌</button>
                <button className="toolbar-btn" onClick={() => formatText('insertOrderedList')}>1.</button>
                <button className="toolbar-btn" onClick={() => formatText('insertUnorderedList')}>•</button>
                <button className="toolbar-btn" onClick={() => formatText('createLink', prompt('Nhập URL:'))}>🔗</button>
                <button className="toolbar-btn">⋯</button>
              </div>
              
              <textarea
                className="note-content-textarea"
                placeholder="Nhập nội dung ghi chú..."
                value={newNote.content}
                onChange={(e) => setNewNote({...newNote, content: e.target.value})}
                style={{ fontSize: editorFontSize }}
              />
              
              <div className="saved-notes">
                <h4>Ghi chú đã lưu ({notes.length})</h4>
                {notes.length === 0 ? (
                  <div className="no-notes">Chưa có ghi chú nào được lưu</div>
                ) : (
                  notes.map(note => (
                    <div key={note.id} className="saved-note-item">
                      <div className="note-header">
                        <h5>{note.title}</h5>
                        <button 
                          className="delete-note-btn" 
                          onClick={() => deleteNote(note.id)}
                        >
                          🗑️
                        </button>
                      </div>
                      <div className="note-preview">
                        {note.content.substring(0, 100)}
                        {note.content.length > 100 && '...'}
                      </div>
                      <div className="note-meta">
                        {note.hasPassword && <span className="note-protected">🔒 Có mật khẩu</span>}
                        {note.deadline && <span className="note-deadline">⏰ Hết hạn: {new Date(note.deadline).toLocaleString('vi-VN')}</span>}
                        <span className="note-created">📅 Tạo: {note.createdAt}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        );
        
      case 'learning':
        return (
          <div className="content-section">
            <div className="learning-grid">
              {/* Dịch ngôn ngữ */}
              <div className="translation-section">
                <h3>🌐 Dịch Ngôn Ngữ</h3>
                <div className="language-selectors">
                  <select 
                    className="language-select"
                    value={translation.fromLang}
                    onChange={(e) => setTranslation({...translation, fromLang: e.target.value})}
                  >
                    <option value="auto">Tự động phát hiện</option>
                    <option value="vi">Tiếng Việt</option>
                    <option value="en">English</option>
                    <option value="zh">中文</option>
                    <option value="ja">日本語</option>
                    <option value="ko">한국어</option>
                    <option value="fr">Français</option>
                    <option value="de">Deutsch</option>
                    <option value="es">Español</option>
                    <option value="ru">Русский</option>
                    <option value="th">ไทย</option>
                  </select>
                  <span className="arrow">→</span>
                  <select 
                    className="language-select"
                    value={translation.toLang}
                    onChange={(e) => setTranslation({...translation, toLang: e.target.value})}
                  >
                    <option value="vi">Tiếng Việt</option>
                    <option value="en">English</option>
                    <option value="zh">中文</option>
                    <option value="ja">日本語</option>
                    <option value="ko">한국어</option>
                    <option value="fr">Français</option>
                    <option value="de">Deutsch</option>
                    <option value="es">Español</option>
                    <option value="ru">Русский</option>
                    <option value="th">ไทย</option>
                  </select>
                </div>
                <textarea
                  className="translation-input"
                  placeholder="Nhập văn bản cần dịch..."
                  value={translation.inputText}
                  onChange={(e) => setTranslation({...translation, inputText: e.target.value})}
                />
                <button className="translate-btn" onClick={translateText}>Dịch</button>
                <textarea
                  className="translation-output"
                  placeholder="Kết quả dịch sẽ hiển thị ở đây..."
                  value={translation.outputText}
                  readOnly
                />
              </div>
              
              {/* AI Chat */}
              <div className="ai-chat-section">
                <h3>🤖 AI Hỗ Trợ Học Tập</h3>
                <div className="chat-messages">
                  {chatMessages.map((message, index) => (
                    <div key={index} className={`message ${message.type}`}>
                      <div className="message-content">{message.content}</div>
                    </div>
                  ))}
                </div>
                <div className="chat-input-container">
                  <label className="file-upload-label">📷</label>
                  <input
                    type="text"
                    className="chat-input"
                    placeholder="Nhập tin nhắn..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                  />
                  <button className="send-btn" onClick={sendChatMessage}>Gửi</button>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'entertainment':
        return (
          <div className="content-section">
            <div className="entertainment-section">
              {/* Nghe nhạc */}
              <div className="music-section">
                <h3>🎵 Nghe Nhạc</h3>
                <div className="music-input-container">
                  <input
                    type="text"
                    className="music-input"
                    placeholder="Nhập link nhạc (YouTube, Spotify)..."
                    value={musicInput}
                    onChange={(e) => setMusicInput(e.target.value)}
                  />
                  <button className="add-music-btn" onClick={addMusic}>Thêm</button>
                </div>
                
                <div className="playlist">
                  <h4>Playlist ({musicPlaylist.length})</h4>
                  {musicPlaylist.length === 0 ? (
                    <div className="no-music">Chưa có bài hát nào trong playlist</div>
                  ) : (
                    musicPlaylist.map(song => (
                      <div key={song.id} className="playlist-item">
                        <span className="track-name">{song.title}</span>
                        <button 
                          className="remove-track" 
                          onClick={() => removeMusicFromPlaylist(song.id)}
                        >
                          ❌
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
              
              {/* Xem video */}
              <div className="video-section">
                <h3>📺 Xem Video</h3>
                <div className="video-input-container">
                  <input
                    type="text"
                    className="video-input"
                    placeholder="Nhập link video (YouTube, Bilibili)..."
                    value={videoInput}
                    onChange={(e) => setVideoInput(e.target.value)}
                  />
                  <button className="add-video-btn" onClick={loadVideo}>Phát</button>
                </div>
                
                {currentVideo && (
                  <div className="video-player">
                    <iframe
                      width="100%"
                      height="315"
                      src={currentVideo.includes('youtube.com') ? 
                        currentVideo.replace('watch?v=', 'embed/') : 
                        currentVideo
                      }
                      frameBorder="0"
                      allowFullScreen
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="app">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">
          <h1>AI Assistant</h1>
          <div className="subtitle">Trợ lý thông minh</div>
        </div>
        
        <div className="nav-tabs">
          <button 
            className={`tab schedule-tab ${activeTab === 'schedule' ? 'active' : ''}`}
            onClick={() => setActiveTab('schedule')}
          >
            📅 Thời Gian Biểu
          </button>
          <button 
            className={`tab notes-tab ${activeTab === 'notes' ? 'active' : ''}`}
            onClick={() => setActiveTab('notes')}
          >
            📝 Ghi Chú
          </button>
          <button 
            className={`tab learning-tab ${activeTab === 'learning' ? 'active' : ''}`}
            onClick={() => setActiveTab('learning')}
          >
            🤖 AI Hỗ Trợ Học Tập
          </button>
          <button 
            className={`tab entertainment-tab ${activeTab === 'entertainment' ? 'active' : ''}`}
            onClick={() => setActiveTab('entertainment')}
          >
            🎮 Giải Trí
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="main-content">
        {renderTabContent()}
      </div>
    </div>
  );
}

export default App;

