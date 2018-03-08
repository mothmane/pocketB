/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { PocketBTestModule } from '../../../test.module';
import { RetreatCapacityDetailComponent } from '../../../../../../main/webapp/app/entities/retreat-capacity/retreat-capacity-detail.component';
import { RetreatCapacityService } from '../../../../../../main/webapp/app/entities/retreat-capacity/retreat-capacity.service';
import { RetreatCapacity } from '../../../../../../main/webapp/app/entities/retreat-capacity/retreat-capacity.model';

describe('Component Tests', () => {

    describe('RetreatCapacity Management Detail Component', () => {
        let comp: RetreatCapacityDetailComponent;
        let fixture: ComponentFixture<RetreatCapacityDetailComponent>;
        let service: RetreatCapacityService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PocketBTestModule],
                declarations: [RetreatCapacityDetailComponent],
                providers: [
                    RetreatCapacityService
                ]
            })
            .overrideTemplate(RetreatCapacityDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RetreatCapacityDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RetreatCapacityService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new RetreatCapacity(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.retreatCapacity).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
