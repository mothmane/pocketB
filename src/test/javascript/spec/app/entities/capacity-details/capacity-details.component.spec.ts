/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PocketBTestModule } from '../../../test.module';
import { CapacityDetailsComponent } from '../../../../../../main/webapp/app/entities/capacity-details/capacity-details.component';
import { CapacityDetailsService } from '../../../../../../main/webapp/app/entities/capacity-details/capacity-details.service';
import { CapacityDetails } from '../../../../../../main/webapp/app/entities/capacity-details/capacity-details.model';

describe('Component Tests', () => {

    describe('CapacityDetails Management Component', () => {
        let comp: CapacityDetailsComponent;
        let fixture: ComponentFixture<CapacityDetailsComponent>;
        let service: CapacityDetailsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PocketBTestModule],
                declarations: [CapacityDetailsComponent],
                providers: [
                    CapacityDetailsService
                ]
            })
            .overrideTemplate(CapacityDetailsComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CapacityDetailsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CapacityDetailsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CapacityDetails(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.capacityDetails[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
