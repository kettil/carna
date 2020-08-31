/* eslint-disable no-console */
import figlet, { Options } from 'figlet';

const options: Options = { horizontalLayout: 'full', font: '3D Diagonal' };

const logo = async (): Promise<void> =>
  new Promise((resolve, reject) => {
    figlet.text('Carna', options, (error, result) => {
      if (error) {
        reject(error);
      } else {
        console.log(`${result}\n`);

        resolve();
      }
    });
  });

export default logo;
