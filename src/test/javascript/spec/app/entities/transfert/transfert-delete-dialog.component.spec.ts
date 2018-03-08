/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { PocketBTestModule } from '../../../test.module';
import { TransfertDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/transfert/transfert-delete-dialog.component';
import { TransfertService } from '../../../../../../main/webapp/app/entities/transfert/transfert.service';

describe('Component Tests', () => {

    describe('Transfert Management Delete Component', () => {
        let comp: TransfertDeleteDialogComponent;
        let fixture: ComponentFixture<TransfertDeleteDialogComponent>;
        let service: TransfertService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PocketBTestModule],
                declarations: [TransfertDeleteDialogComponent],
                providers: [
                    TransfertService
                ]
            })
            .overrideTemplate(TransfertDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TransfertDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TransfertService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
