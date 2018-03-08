/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { PocketBTestModule } from '../../../test.module';
import { RIBDetailComponent } from '../../../../../../main/webapp/app/entities/rib/rib-detail.component';
import { RIBService } from '../../../../../../main/webapp/app/entities/rib/rib.service';
import { RIB } from '../../../../../../main/webapp/app/entities/rib/rib.model';

describe('Component Tests', () => {

    describe('RIB Management Detail Component', () => {
        let comp: RIBDetailComponent;
        let fixture: ComponentFixture<RIBDetailComponent>;
        let service: RIBService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PocketBTestModule],
                declarations: [RIBDetailComponent],
                providers: [
                    RIBService
                ]
            })
            .overrideTemplate(RIBDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RIBDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RIBService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new RIB(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.rIB).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
