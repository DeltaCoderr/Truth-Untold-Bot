# Truth Untold
[![Build Status](https://travis-ci.org/sirDonovan/Cassius.svg)](https://travis-ci.org/sirDonovan/Cassius)

A bot for [Pokemon Showdown][1].

  [1]: https://github.com/Zarel/Pokemon-Showdown

## Installation
Cassius requires [Node.js][3] version 6.0.0 or later and a command line (e.g. `Command Prompt` on Windows or `Terminal` on Mac OS/Linux) to run. Once you have compatible software, complete installation by following these steps:

1. Obtain a copy of Cassius

  You can do this through the [GitHub client][4] by clicking the "Clone or download" button on the home page of the repository and then clicking "Open in Desktop". You can also use the following [Git][5] command:
  
  `git clone https://github.com/sirDonovan/Cassius.git`

  [3]: https://nodejs.org/
  [4]: https://desktop.github.com/
  [5]: https://git-scm.com/
  [9]: https://github.com/Zerapium
2. Navigate to the root directory

  The remaining steps will take place in the root directory of your Cassius files. Navigate there with the command:

  `cd DIRECTORY`
  
  Replace `DIRECTORY` with the filepath to your directory (e.g. `C:\Users\sirDonovan\Documents\GitHub\Cassius`).

3. Install dependencies

  Run the following command to install required dependencies:

  `npm install --production`

  If you plan to contribute to development, run the command without the `--production` flag to also install dependencies used for testing.

4. Set up the config file

  Copy and paste the `config-example.js` file, rename it to `config.js`, and open it in your text editor to enter your desired information.

From this point on, you can start the bot by running the following command:

  `node app.js`

## Credits
  * Pokem9n ([@Zerapium][9]) - Lead Developer
  * Quinton Lee ([@sirDonovan][6]) - Base Repository [Cassius][10]
  * [Pokemon Showdown][1] - In-game data files, Tools module, and various helper functions
  * [Contributors][7]

  [6]: https://github.com/sirDonovan
[10]: https://github.com/sirDonovan/Cassius
  [7]: https://github.com/sirDonovan/Cassius/graphs/contributors

## License

  Truth Untold is distributed under the terms of the [MIT License][8].

  [8]: https://github.com/sirDonovan/Cassius/blob/master/LICENSE
