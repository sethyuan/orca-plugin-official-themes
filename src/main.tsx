import { setupL10N, t } from "./libs/l10n"
import zhCN from "./translations/zhCN"

const { subscribe } = window.Valtio

let pluginName: string
let unsubscribe: () => void

export async function load(_name: string) {
  pluginName = _name

  setupL10N(orca.state.locale, { "zh-CN": zhCN })

  orca.plugins.setSettingsSchema(pluginName, {
    enableRoundShell: {
      type: "boolean",
      label: t("Enable Round Shell"),
      description: t(
        "An alternative shell style with a unified rounded appearance.",
      ),
      defaultValue: false,
    },
  })

  unsubscribe = subscribe(orca.state.plugins[pluginName]!, async () => {
    if (orca.state.plugins[pluginName]!.settings?.enableRoundShell) {
      injectRoundShell()
    } else {
      removeRoundShell()
    }
  })

  if (orca.state.plugins[pluginName]?.settings?.enableRoundShell) {
    injectRoundShell()
  }

  if (orca.state.themes["Aurora Borealis"] == null) {
    orca.themes.register(pluginName, "Aurora Borealis", "aurora-borealis.css")
  }
  if (orca.state.themes["Catppuccin"] == null) {
    orca.themes.register(pluginName, "Catppuccin", "catppuccin.css")
  }
  if (orca.state.themes["Mono Mint"] == null) {
    orca.themes.register(pluginName, "Mono Mint", "mono-mint.css")
  }
  if (orca.state.themes["Moonlit Sakura"] == null) {
    orca.themes.register(pluginName, "Moonlit Sakura", "moonlit-sakura.css")
  }
  if (orca.state.themes["Pastel Garden"] == null) {
    orca.themes.register(pluginName, "Pastel Garden", "pastel-garden.css")
  }
  if (orca.state.themes["Sandstone Dusk"] == null) {
    orca.themes.register(pluginName, "Sandstone Dusk", "sandstone-dusk.css")
  }
}

export async function unload() {
  orca.themes.unregister("Aurora Borealis")
  orca.themes.unregister("Catppuccin")
  orca.themes.unregister("Mono Mint")
  orca.themes.unregister("Moonlit Sakura")
  orca.themes.unregister("Pastel Garden")
  orca.themes.unregister("Sandstone Dusk")

  removeRoundShell()
}

function injectRoundShell() {
  removeRoundShell()

  document.body.classList.add("kef-round-shell")
  orca.themes.injectCSSResource(
    `${pluginName}/dist/round-shell.css`,
    pluginName,
  )
}

function removeRoundShell() {
  orca.themes.removeCSSResources(pluginName)
  document.body.classList.remove("kef-round-shell")
}
