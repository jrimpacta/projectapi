import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from "@angular/fire/compat/storage";
import {lastValueFrom, Observable, Subject} from "rxjs";
import { finalize, takeUntil } from "rxjs/operators";
import firebase from 'firebase/compat/app';
@Component({
	selector: 'app-upload',
	templateUrl: './upload.component.html',
	styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit, OnDestroy {
	@Input() file !: File;
	@Output() completed = new EventEmitter<string>();

	task!:AngularFireUploadTask;
	percentage$!: Observable<number>;
	public snapshot$!: Observable<firebase.storage.UploadTaskSnapshot>;
	downloadURL!: string;

	constructor(private  storage : AngularFireStorage) {

	}
	private destroy = new  Subject<void>();
	ngOnInit(): void {
		this.startUpload();
	}

	ngOnDestroy(): void {
		this.destroy.next();
		this.destroy.complete();
	}

	startUpload = ():void => {
		const path = `${this.file.type.split('/')[0]}/${Date.now()}_${this.file.name}`;

		const storageRef = this.storage.ref(path);
		this.task = this.storage.upload(path, this.file);

		this.percentage$ = this.task.percentageChanges() as Observable<number>;
		this.snapshot$ = this.task.snapshotChanges() as Observable<firebase.storage.UploadTaskSnapshot>;

		this.snapshot$.pipe(
			takeUntil(this.destroy),
			finalize( async () => {
				const storageRefObservable$ = storageRef.getDownloadURL();
				this.downloadURL = await lastValueFrom(storageRefObservable$);
				this.completed.next(this.downloadURL);
			} )
		).subscribe();
	}
}
