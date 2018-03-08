/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { PocketBTestModule } from '../../../test.module';
import { CapacityDetailsDetailComponent } from '../../../../../../main/webapp/app/entities/capacity-details/capacity-details-detail.component';
import { CapacityDetailsService } from '../../../../../../main/webapp/app/entities/capacity-details/capacity-details.service';
import { CapacityDetails } from '../../../../../../main/webapp/app/entities/capacity-details/capacity-details.model';

describe('Component Tests', () => {

    describe('CapacityDetails Management Detail Component', () => {
        let comp: CapacityDetailsDetailComponent;
        let fixture: ComponentFixture<CapacityDetailsDetailComponent>;
        let service: CapacityDetailsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PocketBTestModule],
                declarations: [CapacityDetailsDetailComponent],
                providers: [
                    CapacityDetailsService
                ]
            })
            .overrideTemplate(CapacityDetailsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CapacityDetailsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CapacityDetailsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CapacityDetails(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.capacityDetails).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
