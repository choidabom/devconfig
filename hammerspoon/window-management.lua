local This = {}

-- Defining screen positions
local screenPositions       = {}
This.screenPositions = screenPositions

function This.get_window_under_mouse()
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

-- This function will move either the specified or the focused
-- window to the center of the sreen and let it fill up the
-- entire screen.
function This.windowToggleMaximize(factor, window)
   if window == nil then
      window = This.get_window_under_mouse()
   end
   if window then
      if This.screenPositions[window:id()] then
          window:setFrame(This.screenPositions[window:id()])
          This.screenPositions[window:id()] = nil
      else
          This.screenPositions[window:id()] = window:frame()
          window:maximize()
      end
   end
end

return This

