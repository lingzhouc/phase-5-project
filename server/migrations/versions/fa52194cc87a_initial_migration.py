"""initial migration

Revision ID: fa52194cc87a
Revises: 
Create Date: 2024-01-08 20:42:27.965446

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'fa52194cc87a'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('cards',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('img', sa.String(), nullable=False),
    sa.Column('url', sa.String(), nullable=True),
    sa.Column('issuer', sa.String(), nullable=False),
    sa.Column('welcome_bonus', sa.String(), nullable=True),
    sa.Column('annual_fee', sa.Integer(), nullable=False),
    sa.Column('bal_trans_fee', sa.String(), nullable=True),
    sa.Column('intro_apr', sa.String(), nullable=True),
    sa.Column('reg_apr', sa.String(), nullable=True),
    sa.Column('other_details', sa.Text(), nullable=True),
    sa.Column('credit_score', sa.String(), nullable=False),
    sa.Column('user_type', sa.String(), nullable=False),
    sa.Column('secured', sa.Boolean(), nullable=False),
    sa.Column('earnings', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_table('glossary',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('term', sa.String(), nullable=False),
    sa.Column('definition', sa.String(), nullable=False),
    sa.Column('more_info', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.Column('username', sa.String(length=25), nullable=False),
    sa.Column('email', sa.String(length=40), nullable=False),
    sa.Column('password', sa.String(), nullable=False),
    sa.Column('favorites', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('reviews',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('review', sa.String(length=1000), nullable=False),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=False),
    sa.Column('updated_at', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('card_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['card_id'], ['cards.id'], name=op.f('fk_reviews_card_id_cards')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_reviews_user_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('reviews')
    op.drop_table('users')
    op.drop_table('glossary')
    op.drop_table('cards')
    # ### end Alembic commands ###