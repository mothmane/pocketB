/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { PocketBTestModule } from '../../../test.module';
import { TransfertDialogComponent } from '../../../../../../main/webapp/app/entities/transfert/transfert-dialog.component';
import { TransfertService } from '../../../../../../main/webapp/app/entities/transfert/transfert.service';
import { Transfert } from '../../../../../../main/webapp/app/entities/transfert/transfert.model';
import { ClientAccountService } from '../../../../../../main/webapp/app/entities/client-account';
import { BeneficiaryAccountService } from '../../../../../../main/webapp/app/entities/beneficiary-account';

describe('Component Tests', () => {

    describe('Transfert Management Dialog Component', () => {
        let comp: TransfertDialogComponent;
        let fixture: ComponentFixture<TransfertDialogComponent>;
        let service: TransfertService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PocketBTestModule],
                declarations: [TransfertDialogComponent],
                providers: [
                    ClientAccountService,
                    BeneficiaryAccountService,
                    TransfertService
                ]
            })
            .overrideTemplate(TransfertDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TransfertDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TransfertService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Transfert(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.transfert = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'transfertListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Transfert();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.transfert = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'transfertListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
