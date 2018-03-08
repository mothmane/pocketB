/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PocketBTestModule } from '../../../test.module';
import { RIBComponent } from '../../../../../../main/webapp/app/entities/rib/rib.component';
import { RIBService } from '../../../../../../main/webapp/app/entities/rib/rib.service';
import { RIB } from '../../../../../../main/webapp/app/entities/rib/rib.model';

describe('Component Tests', () => {

    describe('RIB Management Component', () => {
        let comp: RIBComponent;
        let fixture: ComponentFixture<RIBComponent>;
        let service: RIBService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PocketBTestModule],
                declarations: [RIBComponent],
                providers: [
                    RIBService
                ]
            })
            .overrideTemplate(RIBComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RIBComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RIBService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new RIB(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.rIBS[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
