/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { PocketBTestModule } from '../../../test.module';
import { ClientAccountDialogComponent } from '../../../../../../main/webapp/app/entities/client-account/client-account-dialog.component';
import { ClientAccountService } from '../../../../../../main/webapp/app/entities/client-account/client-account.service';
import { ClientAccount } from '../../../../../../main/webapp/app/entities/client-account/client-account.model';
import { CustomerService } from '../../../../../../main/webapp/app/entities/customer';
import { RIBService } from '../../../../../../main/webapp/app/entities/rib';

describe('Component Tests', () => {

    describe('ClientAccount Management Dialog Component', () => {
        let comp: ClientAccountDialogComponent;
        let fixture: ComponentFixture<ClientAccountDialogComponent>;
        let service: ClientAccountService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PocketBTestModule],
                declarations: [ClientAccountDialogComponent],
                providers: [
                    CustomerService,
                    RIBService,
                    ClientAccountService
                ]
            })
            .overrideTemplate(ClientAccountDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ClientAccountDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClientAccountService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ClientAccount(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.clientAccount = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'clientAccountListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ClientAccount();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.clientAccount = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'clientAccountListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
