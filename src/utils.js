export function getDisplayName(BaseComponent) { // eslint-disable-line
  return BaseComponent.displayName || BaseComponent.name || 'Component'
}
