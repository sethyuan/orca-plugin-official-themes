let pluginName: string

export async function load(_name: string) {
  pluginName = _name

  if (orca.state.themes["Catppuccin"] == null) {
    orca.themes.register(pluginName, "Catppuccin", "catppuccin.css")
  }
}

export async function unload() {
  // Clean up any resources used by the plugin here.
  orca.themes.unregister("Catppuccin")
}
