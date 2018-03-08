/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { PocketBTestModule } from '../../../test.module';
import { CapacityDetailsDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/capacity-details/capacity-details-delete-dialog.component';
import { CapacityDetailsService } from '../../../../../../main/webapp/app/entities/capacity-details/capacity-details.service';

describe('Component Tests', () => {

    describe('CapacityDetails Management Delete Component', () => {
        let comp: CapacityDetailsDeleteDialogComponent;
        let fixture: ComponentFixture<CapacityDetailsDeleteDialogComponent>;
        let service: CapacityDetailsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PocketBTestModule],
                declarations: [CapacityDetailsDeleteDialogComponent],
                providers: [
                    CapacityDetailsService
                ]
            })
            .overrideTemplate(CapacityDetailsDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CapacityDetailsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CapacityDetailsService);
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
