// Analytics tracking utility
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// Generate or get session ID
const getSessionId = () => {
  let sessionId = sessionStorage.getItem('session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    sessionStorage.setItem('session_id', sessionId);
  }
  return sessionId;
};

// Log analytics event
export const logEvent = async (toolId, toolName, eventType, eventData = {}) => {
  try {
    const sessionId = getSessionId();
    
    await fetch(`${BACKEND_URL}/api/analytics/event`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tool_id: toolId,
        tool_name: toolName,
        event_type: eventType,
        event_data: {
          ...eventData,
          session_id: sessionId,
          timestamp: new Date().toISOString(),
          user_agent: navigator.userAgent,
          screen_resolution: `${window.screen.width}x${window.screen.height}`,
          viewport_size: `${window.innerWidth}x${window.innerHeight}`
        }
      })
    });
  } catch (error) {
    console.error('Failed to log analytics event:', error);
  }
};

// Helper functions for common events
export const logPageVisit = (toolId, toolName) => {
  logEvent(toolId, toolName, 'page_visit', {
    path: window.location.pathname,
    referrer: document.referrer
  });
};

export const logButtonClick = (toolId, toolName, buttonName) => {
  logEvent(toolId, toolName, 'button_click', {
    button: buttonName
  });
};

export const logAction = (toolId, toolName, actionName, actionData = {}) => {
  logEvent(toolId, toolName, 'action', {
    action: actionName,
    ...actionData
  });
};

export default {
  logEvent,
  logPageVisit,
  logButtonClick,
  logAction
};
