import { Library, UpsertLibraryDto } from '@unfrl/usufruct-sdk';
import { autorun, makeAutoObservable } from 'mobx';
import { client } from '../utils';
import { RootStore } from './root.store';

export class LibraryStore {
  public selectedLibrary: Library | null = null;
  public libraries: Library[] = [];

  public constructor(private readonly _root: RootStore) {
    makeAutoObservable(this);

    autorun(() => {
      if (this.selectedLibrary?.id) {
        client.setLibraryId(this.selectedLibrary.id);
      } else {
        client.clearLibraryId();
      }
    });
  }

  public fetchLibraries = async () => {
    const libraries = await client.libraries.getLibraries();
    this.setLibraries(libraries);
  };

  public loadLibrary = async (slug?: string): Promise<void> => {
    if (!slug) {
      return this.clearLibrary();
    }

    const library = await this.fetchLibrary(slug);
    this.selectLibrary(library);
  };

  public clearLibrary = () => {
    this.selectedLibrary = null;
  };

  private selectLibrary = (library: Library) => {
    this.selectedLibrary = library;
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

  public createLibrary = async (
    newLibrary: UpsertLibraryDto,
  ): Promise<Library> => {
    if (!this._root.auth.authenticated) {
      throw new Error('unauthorized');
    }

    const library = await client.libraries.createLibrary(newLibrary);

    this.addLibrary(library);
    return library;
  };

  private setLibraries = (libraries: Library[]) => {
    this.libraries = libraries;
  };

  private addLibrary = (library: Library) => {
    this.libraries.push(library);
  };
}
