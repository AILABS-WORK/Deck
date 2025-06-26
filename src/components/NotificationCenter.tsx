import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Check, Clock, Gavel, Sparkles, Users, Trophy } from 'lucide-react';

interface Notification {
  id: string;
  type: 'auction' | 'style' | 'social' | 'achievement' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  priority: 'low' | 'medium' | 'high';
}

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAsRead,
  onMarkAllAsRead
}) => {
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'auction':
        return <Gavel size={16} className="text-accent-400" />;
      case 'style':
        return <Sparkles size={16} className="text-sage-400" />;
      case 'social':
        return <Users size={16} className="text-secondary-400" />;
      case 'achievement':
        return <Trophy size={16} className="text-accent-400" />;
      default:
        return <Bell size={16} className="text-sage-400" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-400';
      case 'medium':
        return 'border-l-accent-400';
      default:
        return 'border-l-sage-400';
    }
  };

  const filteredNotifications = notifications.filter(notification => 
    filter === 'all' || !notification.read
  );

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />
          
          {/* Notification Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-gradient-dark border-l border-sage-700 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-sage-700">
              <div className="flex items-center">
                <Bell className="text-sage-400 mr-3" size={24} />
                <div>
                  <h2 className="text-xl font-display font-bold text-white">
                    Notifications
                  </h2>
                  {unreadCount > 0 && (
                    <p className="text-sm text-sage-400">
                      {unreadCount} unread
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-sage-400 hover:text-white transition-colors rounded-lg hover:bg-sage-800/50"
              >
                <X size={20} />
              </button>
            </div>

            {/* Filter Tabs */}
            <div className="flex border-b border-sage-700">
              <button
                onClick={() => setFilter('all')}
                className={`flex-1 px-6 py-3 text-sm font-medium transition-colors ${
                  filter === 'all'
                    ? 'text-white border-b-2 border-sage-400'
                    : 'text-sage-400 hover:text-white'
                }`}
              >
                All ({notifications.length})
              </button>
              <button
                onClick={() => setFilter('unread')}
                className={`flex-1 px-6 py-3 text-sm font-medium transition-colors ${
                  filter === 'unread'
                    ? 'text-white border-b-2 border-sage-400'
                    : 'text-sage-400 hover:text-white'
                }`}
              >
                Unread ({unreadCount})
              </button>
            </div>

            {/* Actions */}
            {unreadCount > 0 && (
              <div className="p-4 border-b border-sage-700">
                <button
                  onClick={onMarkAllAsRead}
                  className="text-sage-400 hover:text-white transition-colors text-sm flex items-center"
                >
                  <Check size={14} className="mr-1" />
                  Mark all as read
                </button>
              </div>
            )}

            {/* Notifications List */}
            <div className="flex-1 overflow-y-auto">
              {filteredNotifications.length === 0 ? (
                <div className="text-center py-12">
                  <Bell className="w-16 h-16 text-sage-400 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {filter === 'unread' ? 'All caught up!' : 'No notifications'}
                  </h3>
                  <p className="text-sage-400">
                    {filter === 'unread' 
                      ? 'You have no unread notifications'
                      : 'Notifications will appear here when you have them'
                    }
                  </p>
                </div>
              ) : (
                <div className="p-4 space-y-3">
                  {filteredNotifications.map((notification) => (
                    <motion.div
                      key={notification.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className={`p-4 bg-sage-900/20 rounded-xl border-l-4 ${getPriorityColor(notification.priority)} ${
                        !notification.read ? 'bg-sage-800/30' : ''
                      } transition-all duration-200 hover:bg-sage-800/40`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start flex-1">
                          <div className="mr-3 mt-1">
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-medium text-white truncate">
                                {notification.title}
                              </h4>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-sage-400 rounded-full ml-2 flex-shrink-0"></div>
                              )}
                            </div>
                            <p className="text-sm text-sage-300 mb-2">
                              {notification.message}
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center text-xs text-sage-400">
                                <Clock size={12} className="mr-1" />
                                {notification.timestamp}
                              </div>
                              {!notification.read && (
                                <button
                                  onClick={() => onMarkAsRead(notification.id)}
                                  className="text-xs text-sage-400 hover:text-white transition-colors"
                                >
                                  Mark as read
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Settings Footer */}
            <div className="border-t border-sage-700 p-4">
              <button className="w-full text-sage-400 hover:text-white transition-colors text-sm">
                Notification Settings
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NotificationCenter;