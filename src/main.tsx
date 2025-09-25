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

  if (orca.state.themes["Catppuccin"] == null) {
    orca.themes.register(pluginName, "Catppuccin", "catppuccin.css")
  }
}

export async function unload() {
  orca.themes.unregister("Catppuccin")

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
