function get_window_under_mouse()
  local pos = hs.geometry.new(hs.mouse.absolutePosition())
  local screen = hs.mouse.getCurrentScreen()

  local win = hs.fnutils.find(hs.window.filter.new():getWindows(), function(w)
      if w:screen() ~= screen then return nil end
      return screen == w:screen() and pos:inside(w:frame())
  end)
  if not win then
      win:focus()
  end
  return win
end

dragging_win = nil
moving_window = nil
resizing_window = nil

drag_event = hs.eventtap.new(
  {
    hs.eventtap.event.types.mouseMoved,
  }, function(e)
    if not dragging_win then return nil end

    local dx = e:getProperty(hs.eventtap.event.properties.mouseEventDeltaX)
    local dy = e:getProperty(hs.eventtap.event.properties.mouseEventDeltaY)

    --print(moving_window, resizing_window)
    if moving_window then
      dragging_win:move({dx, dy}, nil, false, 0)
    elseif resizing_window then
      local frame = dragging_win:frame()
      local prev = resizing_window[dragging_win:id()]
      local new_w = frame.w + dx
      local new_h = frame.h + dy
      if prev.w - 10 > new_w or prev.w + 10 < new_w or
          prev.h - 10 > new_h or prev.h + 10 < new_h then
          frame.x = prev.x
          frame.y = prev.y
          frame.w = new_w
          frame.h = new_h
          prev.w = frame.w
          prev.h = frame.h
          dragging_win:setFrame(frame, 0)
      end
    end
end)

flag_event = hs.eventtap.new({ hs.eventtap.event.types.flagsChanged }, function(e)
  local flags = e:getFlags()

  if flags.ctrl and flags.cmd then
    dragging_win = get_window_under_mouse()
    moving_window = nil
    if not resizing_window then
        resizing_window = {}
        resizing_window[dragging_win:id()] = dragging_win:frame()
    end
    drag_event:start()
  elseif flags.ctrl then
    dragging_win = get_window_under_mouse()
    moving_window = true
    resizing_window = nil
    drag_event:start()
  else
    draggin_window = nil
    moving_window = nil
    resizing_window = nil
    drag_event:stop()
  end
end)

flag_event:start()
