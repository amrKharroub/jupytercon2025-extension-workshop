import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { requestAPI } from './request';

import { ImageCaptionMainAreaWidget } from './widget';
import { ICommandPalette } from "@jupyterlab/apputils";
import { ILauncher } from "@jupyterlab/launcher";
import { imageIcon } from "@jupyterlab/ui-components";

/**
 * Initialization data for the jupytercon2025-extension-workshop extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupytercon2025-extension-workshop:plugin',
  description: 'A JupyterLab extension that displays a random image and caption.',
  autoStart: true,
  requires: [ICommandPalette, ILauncher],
  activate: (app: JupyterFrontEnd, palette: ICommandPalette, launcher: ILauncher) => {
    console.log('JupyterLab extension jupytercon2025-extension-workshop is activated!');

    requestAPI<any>('hello')
      .then(data => {
        console.log(data);
      })
      .catch(reason => {
        console.error(
          `The jupytercon2025_extension_workshop server extension appears to be missing.\n${reason}`
        );
      });

    const command_id = "image-caption:open";
    app.commands.addCommand(command_id, {
      execute: () => {
        const widget = new ImageCaptionMainAreaWidget();

        app.shell.add(widget, "main");
        return widget;
      },
      icon: imageIcon,
      label: "View a random image & caption"
    });
    palette.addItem({command: command_id, category: "Notebook"});
    launcher.add({ command: command_id, category: "Notebook" });
  }
};

export default plugin;
