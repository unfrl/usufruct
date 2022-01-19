import { Library, UpsertLibraryDto } from '@unfrl/usufruct-sdk';
import { makeAutoObservable } from 'mobx';
import { client } from '../api';
import { RootStore } from './root.store';

export class LibraryStore {
  public activeLibrary: Library | null = null;

  public libraries: Library[] = [];

  public get activeLibraryId(): string {
    return this.activeLibrary?.id ?? '';
  }

  public constructor(private readonly _root: RootStore) {
    makeAutoObservable(this);
  }

  public fetchLibraries = async () => {
    this.setLibraries(await client.libraries.getLibraries());
  };

  public loadLibrary = async (slug?: string): Promise<void> => {
    if (!slug) {
      return this.clearActiveLibrary();
    }

    this.setActiveLibrary(await this.fetchLibrary(slug));
  };

  public clearActiveLibrary = () => {
    this.activeLibrary = null;
  };

  private setActiveLibrary = (library: Library) => {
    this.activeLibrary = library;
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
