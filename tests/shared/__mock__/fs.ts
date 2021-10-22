import { isArray } from '@kettil/tool-lib';

const fs: any = jest.createMockFromModule('fs');

// access

let accessMockFiles: Record<string, boolean> = {};
const setMockAccessFiles = (files: Record<string, boolean>) => {
  accessMockFiles = files;
};
const addMockAccessFile = (file: string, isExist: boolean) => {
  Object.assign(accessMockFiles, { [file]: isExist });
};

const access = jest.fn(async (path: string): Promise<void> => {
  if (typeof accessMockFiles[path] === 'boolean') {
    if (accessMockFiles[path]) {
      return;
    }

    const error = new Error(`ENOENT: no such file or directory, access '${path}'`);

    (error as any).code = 'ENOENT';
    (error as any).syscall = 'access';

    throw error;
  }

  throw new Error(`access: ${path} is unknown`);
});

// readdir

export type ReaddirMockFiles = Record<
  string,
  Array<{ name: string; isFile: () => boolean; isDirectory: () => boolean }>
>;

let readdirMockFiles: ReaddirMockFiles = {};
const setMockReaddirFiles = (folders: ReaddirMockFiles) => {
  readdirMockFiles = folders;
};

const readdir = jest.fn(async (path: string): Promise<Array<{ name: string; isDirectory: () => boolean }>> => {
  if (isArray(readdirMockFiles[path])) {
    return readdirMockFiles[path];
  }

  throw new Error(`readdir: ${path} is unknown`);
});

// readFile

let readFileMockFiles: Record<string, string> = {};
const setMockReadFileFiles = (files: Record<string, string>) => {
  readFileMockFiles = files;
};

const readFile = jest.fn(async (path: string): Promise<string> => {
  if (typeof readFileMockFiles[path] === 'string') {
    return readFileMockFiles[path];
  }

  throw new Error(`readFile: ${path} is unknown`);
});

// writeFile

const writeFile = jest.fn(async (path: string, data: string): Promise<void> => {
  expect({ path, data }).toMatchSnapshot('fs');
});

// mkdir

const mkdir = jest.fn(async (path: string, options: unknown): Promise<void> => {
  expect({ path, options }).toMatchSnapshot('fs');
});

// mkdir

const copyFile = jest.fn(async (source: string, destination: string): Promise<void> => {
  expect({ src: source, dest: destination }).toMatchSnapshot('fs');
});

// -

fs.setMockAccessFiles = setMockAccessFiles;
fs.addMockAccessFile = addMockAccessFile;
fs.setMockReaddirFiles = setMockReaddirFiles;
fs.setMockReadFileFiles = setMockReadFileFiles;
fs.promises = { access, readFile, readdir, writeFile, mkdir, copyFile };

module.exports = fs;
