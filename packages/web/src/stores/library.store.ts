import { Library, UpsertLibraryDto } from '@unfrl/usufruct-sdk';
import { makeAutoObservable } from 'mobx';
import { client } from '../api';
import { RootStore } from './root.store';

export class LibraryStore {
  public libraries: Library[] = [];

  public activeLibraryId: string | null = null;

  public get activeLibrary(): Library | null | undefined {
    return this.activeLibraryId
      ? this.libraries.find((l) => l.id === this.activeLibraryId)
      : null;
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

    const library = await this.fetchLibrary(slug);

    this.setActiveLibrary(library.id);
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

  //#region Actions

  public clearActiveLibrary = () => {
    this.activeLibraryId = null;
  };

  private setActiveLibrary = (id: string) => {
    this.activeLibraryId = id;
  };

  private setLibraries = (libraries: Library[]) => {
    this.libraries = libraries;
  };

  private addLibrary = (library: Library) => {
    this.libraries.push(library);
  };

  //#endregion
}
