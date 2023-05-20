import environment from './environment.js';
import FileManager from './file-manager.js';
import UrlFileManager from './url-file-manager.js';
import createFromEnvironment from '../less/index.js';
const less = createFromEnvironment(environment, [new FileManager(), new UrlFileManager()]);
import lesscHelper from './lessc-helper.js';
import options from '../less/default-options.js'
import imageSize from './image-size.js'
import pluginLoader from './plugin-loader.js'
import fs from './fs.js'

// allow people to create less with their own environment
less.createFromEnvironment = createFromEnvironment;
less.lesscHelper = lesscHelper;
less.PluginLoader = pluginLoader;
less.fs = fs;
less.FileManager = FileManager;
less.UrlFileManager = UrlFileManager;

// Set up options
less.options = options;

export default less;
