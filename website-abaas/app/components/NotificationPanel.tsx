'use client';

import { useState } from 'react';
import { NgoData } from '../lib/fetchData';

interface NotificationPanelProps {
  users: NgoData[];
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationPanel({ users, isOpen, onClose }: NotificationPanelProps) {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [selectedUser, setSelectedUser] = useState<string>('all');
  const [sending, setSending] = useState(false);

  if (!isOpen) return null;

  const sendNotification = async () => {
    if (!title || !message) {
      alert('Title and message are required!');
      return;
    }

    setSending(true);
    try {
      const response = await fetch('/api/send-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          message,
          imageUrl: imageUrl || undefined,
          userId: selectedUser === 'all' ? null : selectedUser,
        }),
      });

      const result = await response.json();

      if (result.success) {
        alert(`Notification sent successfully! ${result.sentCount} notifications delivered.`);
        setTitle('');
        setMessage('');
        setImageUrl('');
        setSelectedUser('all');
      } else {
        alert(`Failed to send notification: ${result.error}`);
      }
    } catch (error) {
      console.error('Error sending notification:', error);
      alert('Failed to send notification. Check console for details.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 backdrop-blur-md bg-white/30"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className="relative bg-white rounded-lg max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border-2 border-[#CCB256]">
        {/* Header - Fixed */}
        <div className="flex-shrink-0 bg-[#F1EFCE] border-b-2 border-[#CCB256] p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-[#C03825] handwritten">📢 Send Notification</h2>
          <button
            onClick={onClose}
            className="text-[#C03825] hover:text-[#a02f1f] text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Select User */}
          <div>
            <label className="block text-sm font-medium text-[#C03825] mb-2">
              Send To
            </label>
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="w-full px-4 py-2 border-2 border-[#CCB256] rounded focus:ring-2 focus:ring-[#CCB256] focus:border-[#CCB256]"
            >
              <option value="all">All Users ({users.length} users)</option>
              <optgroup label="Individual Users">
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.fullName} - {user.phoneNumber}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-[#C03825] mb-2">
              Notification Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., New Benefit Available"
              className="w-full px-4 py-2 border-2 border-[#CCB256] rounded focus:ring-2 focus:ring-[#CCB256] focus:border-[#CCB256]"
              maxLength={50}
            />
            <p className="text-xs text-gray-500 mt-1">{title.length}/50 characters</p>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-[#C03825] mb-2">
              Message *
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your notification message here..."
              rows={4}
              className="w-full px-4 py-2 border-2 border-[#CCB256] rounded focus:ring-2 focus:ring-[#CCB256] focus:border-[#CCB256]"
              maxLength={200}
            />
            <p className="text-xs text-gray-500 mt-1">{message.length}/200 characters</p>
          </div>

          {/* Image URL (Optional) */}
          <div>
            <label className="block text-sm font-medium text-[#C03825] mb-2">
              Image URL (Optional)
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-2 border-2 border-[#CCB256] rounded focus:ring-2 focus:ring-[#CCB256] focus:border-[#CCB256]"
            />
            {imageUrl && (
              <div className="mt-2">
                <img 
                  src={imageUrl} 
                  alt="Preview" 
                  className="h-20 w-20 object-cover rounded border-2 border-[#CCB256]"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>

          {/* Preview */}
          {(title || message) && (
            <div className="border-2 border-[#CCB256] rounded-lg p-4 bg-[#F1EFCE]">
              <p className="text-xs font-medium text-[#C03825] mb-2">Preview:</p>
              <div className="bg-white p-3 rounded shadow-sm">
                {imageUrl && (
                  <img 
                    src={imageUrl} 
                    alt="Notification" 
                    className="w-full h-32 object-cover rounded mb-2"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                )}
                <p className="font-bold text-sm text-gray-900">{title || 'Title'}</p>
                <p className="text-xs text-gray-600 mt-1">{message || 'Message'}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer - Fixed */}
        <div className="flex-shrink-0 bg-[#F1EFCE] border-t-2 border-[#CCB256] p-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={sending}
            className="px-6 py-2 border-2 border-[#CCB256] text-[#C03825] rounded hover:bg-[#E5DCC8] font-medium disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={sendNotification}
            disabled={sending || !title || !message}
            className="px-6 py-2 bg-[#C03825] text-white rounded hover:bg-[#a02f1f] font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {sending ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Sending...
              </>
            ) : (
              <>
                <span>📤</span>
                Send Notification
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
