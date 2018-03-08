/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { PocketBTestModule } from '../../../test.module';
import { RetreatCapacityDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/retreat-capacity/retreat-capacity-delete-dialog.component';
import { RetreatCapacityService } from '../../../../../../main/webapp/app/entities/retreat-capacity/retreat-capacity.service';

describe('Component Tests', () => {

    describe('RetreatCapacity Management Delete Component', () => {
        let comp: RetreatCapacityDeleteDialogComponent;
        let fixture: ComponentFixture<RetreatCapacityDeleteDialogComponent>;
        let service: RetreatCapacityService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PocketBTestModule],
                declarations: [RetreatCapacityDeleteDialogComponent],
                providers: [
                    RetreatCapacityService
                ]
            })
            .overrideTemplate(RetreatCapacityDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RetreatCapacityDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RetreatCapacityService);
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
