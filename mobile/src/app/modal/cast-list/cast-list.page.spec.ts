import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CastListPage } from './cast-list.page';

describe('CastListPage', () => {
  let component: CastListPage;
  let fixture: ComponentFixture<CastListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CastListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CastListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
