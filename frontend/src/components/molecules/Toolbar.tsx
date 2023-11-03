import React from 'react';
import { ToolbarProps } from 'react-big-calendar';

const MyToolbar: React.FC<ToolbarProps> = ({
  date,
  onNavigate,
  onView,
  children,
}) => {
  const navigate = (action: 'PREV' | 'NEXT' | 'TODAY') => {
    onNavigate(action);
  };

  const viewnavigate = (action: 'month' | 'week' | 'day' | 'agenda') => {
    onView(action);
  };

  return (
    <div className="my-custom-toolbar">
      <button type="button" onClick={() => navigate('PREV')}>
        {'<'}
      </button>
      <button type="button" onClick={() => navigate('TODAY')}>
        오늘
      </button>
      <button type="button" onClick={() => navigate('NEXT')}>
      {'>'}
      </button>
      <span className="rbc-toolbar-label">{`${date.getFullYear()}년 ${date.getMonth() + 1}월`}</span>
      <button type="button" onClick={() => viewnavigate('month')}>
        월
      </button>
      <button type="button" onClick={() => viewnavigate('week')}>
        주
      </button>
      <button type="button" onClick={() => viewnavigate('day')}>
        일
      </button>
      <button type="button" onClick={() => viewnavigate('agenda')}>
        목록
      </button>

      {/* <span>{label}</span> */}
      {children}
    </div>
  );
};

export default MyToolbar;
