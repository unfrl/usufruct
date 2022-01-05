import { Library, UpsertLibraryDto } from '@unfrl/usufruct-sdk';
import { makeAutoObservable } from 'mobx';
import { client } from '../utils';
import { RootStore } from './root.store';

export class LibraryStore {
  public libraries: Library[] = [];

  public constructor(private readonly _root: RootStore) {
    makeAutoObservable(this);
  }

  public fetchLibraries = async () => {
    try {
      const libraries = await client.libraries.getLibraries();
      this.setLibraries(libraries);
    } catch (error) {
      console.error('failed to fetch libraries', error);
      throw error;
    }
  };

  public createLibrary = async (newLibrary: UpsertLibraryDto) => {
    if (!this._root.auth.authenticated) {
      throw new Error('unauthorized');
    }

    try {
      const library = await client.libraries.createLibrary(newLibrary);
      this.addLibrary(library);
    } catch (error) {
      console.error('failed to create library', error);
      throw error;
    }
  };

  private setLibraries = (libraries: Library[]) => {
    this.libraries = libraries;
  };

  private addLibrary = (library: Library) => {
    this.libraries.push(library);
  };
}
