/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PocketBTestModule } from '../../../test.module';
import { RetreatCapacityComponent } from '../../../../../../main/webapp/app/entities/retreat-capacity/retreat-capacity.component';
import { RetreatCapacityService } from '../../../../../../main/webapp/app/entities/retreat-capacity/retreat-capacity.service';
import { RetreatCapacity } from '../../../../../../main/webapp/app/entities/retreat-capacity/retreat-capacity.model';

describe('Component Tests', () => {

    describe('RetreatCapacity Management Component', () => {
        let comp: RetreatCapacityComponent;
        let fixture: ComponentFixture<RetreatCapacityComponent>;
        let service: RetreatCapacityService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PocketBTestModule],
                declarations: [RetreatCapacityComponent],
                providers: [
                    RetreatCapacityService
                ]
            })
            .overrideTemplate(RetreatCapacityComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RetreatCapacityComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RetreatCapacityService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new RetreatCapacity(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.retreatCapacities[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
