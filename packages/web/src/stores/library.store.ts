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
    const libraries = await client.libraries.getLibraries();
    this.setLibraries(libraries);
  };

  public fetchLibrary = async (slug: string): Promise<Library> => {
    const existing = this.libraries.find((l) => l.slug === slug);
    if (existing) {
      return existing;
    }

    const library = await client.libraries.getLibrary(slug);
    if (!library) {
      throw new Error('Library not found');
    }

    this.addLibrary(library);
    return library;
  };

  public createLibrary = async (newLibrary: UpsertLibraryDto) => {
    if (!this._root.auth.authenticated) {
      throw new Error('unauthorized');
    }

    const library = await client.libraries.createLibrary(newLibrary);
    this.addLibrary(library);
  };

  private setLibraries = (libraries: Library[]) => {
    this.libraries = libraries;
  };

  private addLibrary = (library: Library) => {
    this.libraries.push(library);
  };
}
